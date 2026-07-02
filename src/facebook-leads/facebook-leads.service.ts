import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { TenantContext, TenantInfo } from "../tenant/tenant.context";
import { Lead } from "../marketing/leads/Lead";
import { LeadSource } from "../marketing/lead-sources/LeadSource";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";

interface FbFieldData {
  name: string;
  values: string[];
}

interface FbLeadgenResponse {
  field_data: FbFieldData[];
  id: string;
  created_time?: string;
}

interface TenantRow {
  id: number;
  slug: string;
  db_name: string;
  db_host: string;
  db_port: number;
  db_user: string;
  db_pass: string;
  parent_id: number | null;
}

@Injectable()
export class FacebookLeadsService {
  private readonly logger = new Logger(FacebookLeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tds: TenantDataSourceService,
  ) {}

  async processLeadgenId(leadgenId: string, pageId?: string): Promise<void> {
    // Get all active tenants including parent_id via raw SQL
    // (generated Prisma client doesn't expose parent_id yet)
    const tenants = await this.prisma.$queryRaw<TenantRow[]>`
      SELECT id, slug, db_name, db_host, db_port, db_user, db_pass, parent_id
      FROM tenants
      WHERE is_active = 1
    `;

    const toTenantInfo = (t: TenantRow): TenantInfo => ({
      id: t.id,
      slug: t.slug,
      dbName: t.db_name,
      dbHost: t.db_host,
      dbPort: t.db_port,
      dbUser: t.db_user,
      dbPass: t.db_pass,
    });

    // Find the tenant whose empresa_config.fb_page_id matches the incoming page_id.
    // Falls back to trying all tenants with a token configured when page_id is absent.
    let matchedTenant: TenantRow | undefined;

    if (pageId) {
      for (const t of tenants) {
        const info = toTenantInfo(t);
        const found = await TenantContext.run(info, async () => {
          const repo = await this.tds.getRepository(EmpresaConfig);
          const config = await repo.findOne({ where: { id: 1 } });
          return config?.fb_page_id === pageId && !!config?.fb_page_access_token ? config : null;
        });
        if (found) {
          matchedTenant = t;
          break;
        }
      }
    }

    if (matchedTenant) {
      // Identified exact tenant — process and propagate to parent if one exists
      await this.processAndPropagate(leadgenId, matchedTenant, tenants, toTenantInfo);
    } else {
      // No page_id or no match — try every tenant that has a token (legacy fallback)
      for (const t of tenants) {
        await TenantContext.run(toTenantInfo(t), async () => {
          try {
            const repo = await this.tds.getRepository(EmpresaConfig);
            const config = await repo.findOne({ where: { id: 1 } });
            if (!config?.fb_page_access_token) return;
            await this.fetchAndSaveLead(leadgenId, config.fb_page_access_token, config.nombre, t.slug);
          } catch (err) {
            this.logger.error(`[${t.slug}] Error procesando leadgen_id ${leadgenId}: ${err}`);
          }
        });
      }
    }
  }

  private async processAndPropagate(
    leadgenId: string,
    tenant: TenantRow,
    allTenants: TenantRow[],
    toInfo: (t: TenantRow) => TenantInfo,
  ): Promise<void> {
    // Save in the matched tenant
    const companyName = await TenantContext.run(toInfo(tenant), async () => {
      try {
        const repo = await this.tds.getRepository(EmpresaConfig);
        const config = await repo.findOne({ where: { id: 1 } });
        if (!config?.fb_page_access_token) return null;
        await this.fetchAndSaveLead(leadgenId, config.fb_page_access_token, config.nombre, tenant.slug);
        return config.nombre;
      } catch (err) {
        this.logger.error(`[${tenant.slug}] Error: ${err}`);
        return null;
      }
    });

    // If tenant has a parent, copy the lead there too so Zentra can see it
    if (tenant.parent_id && companyName) {
      const parentTenant = allTenants.find((t) => t.id === tenant.parent_id);
      if (parentTenant) {
        await TenantContext.run(toInfo(parentTenant), async () => {
          try {
            const repo = await this.tds.getRepository(EmpresaConfig);
            const config = await repo.findOne({ where: { id: 1 } });
            if (!config?.fb_page_access_token) return;
            await this.fetchAndSaveLead(leadgenId, config.fb_page_access_token, companyName, parentTenant.slug);
          } catch (err) {
            this.logger.error(`[${parentTenant.slug}] Error al copiar lead desde ${tenant.slug}: ${err}`);
          }
        });
      }
    }
  }

  private async fetchAndSaveLead(
    leadgenId: string,
    accessToken: string,
    originCompany: string,
    tenantSlug: string,
  ): Promise<void> {
    const url = `https://graph.facebook.com/v20.0/${leadgenId}?fields=field_data,created_time&access_token=${accessToken}`;
    let fbData: FbLeadgenResponse;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text();
        this.logger.error(`[${tenantSlug}] Error Graph API: ${res.status} ${body}`);
        return;
      }
      fbData = (await res.json()) as FbLeadgenResponse;
    } catch (err) {
      this.logger.error(`[${tenantSlug}] Fallo al llamar Graph API: ${err}`);
      return;
    }

    const fields = fbData.field_data ?? [];
    const get = (names: string[]) => {
      for (const n of names) {
        const f = fields.find((f) => f.name === n);
        if (f?.values?.[0]) return f.values[0];
      }
      return undefined;
    };

    const fullName = get(["full_name", "first_name"]) ?? "Sin nombre";
    const email = get(["email"]);
    const phone = get(["phone_number", "phone"]);

    const source = await this.getOrCreateFacebookSource();
    const stage = await this.getFirstStage();

    if (!stage) {
      this.logger.error(`[${tenantSlug}] No hay stages configurados`);
      return;
    }

    const repo = await this.tds.getRepository(Lead);

    const existing = await repo.findOne({ where: { fbLeadgenId: leadgenId } as any });
    if (existing) {
      this.logger.warn(`[${tenantSlug}] Lead ${leadgenId} ya existe (id=${existing.id}), omitiendo duplicado`);
      return;
    }

    const lead = repo.create({
      fullName,
      email: email ?? null,
      phone: phone ?? null,
      notes: `Lead importado desde Facebook Lead Ads (ID: ${leadgenId})`,
      originCompany,
      fbLeadgenId: leadgenId,
      sourceId: source.id,
      currentStage: stage,
    } as any);

    await repo.save(lead);
    this.logger.log(`[${tenantSlug}] Lead creado: ${fullName} — empresa: ${originCompany} (leadgen_id: ${leadgenId})`);
  }

  private async getOrCreateFacebookSource(): Promise<LeadSource> {
    const repo = await this.tds.getRepository(LeadSource);
    let source = await repo.findOne({ where: { name: "Facebook Ads" } });
    if (!source) {
      source = repo.create({ name: "Facebook Ads", channel: "facebook" });
      await repo.save(source);
    }
    return source;
  }

  private async getFirstStage(): Promise<LeadStage | null> {
    const repo = await this.tds.getRepository(LeadStage);
    return repo.findOne({
      where: { isActive: true, isFinal: false },
      order: { order: "ASC" },
    });
  }
}
