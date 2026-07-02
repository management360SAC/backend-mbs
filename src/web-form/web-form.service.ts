import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { TenantContext, TenantInfo } from "../tenant/tenant.context";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";
import { Lead } from "../marketing/leads/Lead";
import { LeadSource } from "../marketing/lead-sources/LeadSource";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { SubmitFormDto } from "./dto/submit-form.dto";

@Injectable()
export class WebFormService {
  private readonly logger = new Logger(WebFormService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tds: TenantDataSourceService,
  ) {}

  async submitLead(apiKey: string, dto: SubmitFormDto): Promise<void> {
    const tenants = await this.prisma.$queryRaw<
      { id: number; slug: string; db_name: string; db_host: string; db_port: number; db_user: string; db_pass: string }[]
    >`SELECT id, slug, db_name, db_host, db_port, db_user, db_pass FROM tenants WHERE is_active = 1`;

    for (const t of tenants) {
      const info: TenantInfo = {
        id: t.id, slug: t.slug, dbName: t.db_name,
        dbHost: t.db_host, dbPort: t.db_port, dbUser: t.db_user, dbPass: t.db_pass,
      };

      const matched = await TenantContext.run(info, async () => {
        const repo = await this.tds.getRepository(EmpresaConfig);
        const config = await repo.findOne({ where: { id: 1 } });
        return config?.web_form_api_key === apiKey ? config : null;
      });

      if (matched) {
        await TenantContext.run(info, async () => {
          await this.saveLead(dto, matched.nombre, t.slug);
        });
        return;
      }
    }

    throw new UnauthorizedException("API key inválida");
  }

  private async saveLead(dto: SubmitFormDto, companyName: string, tenantSlug: string): Promise<void> {
    const source = await this.getOrCreateSource("Formulario Web", "web");
    const stage = await this.getFirstStage();

    if (!stage) {
      this.logger.error(`[${tenantSlug}] No hay stages configurados`);
      return;
    }

    const repo = await this.tds.getRepository(Lead);
    const lead = repo.create({
      fullName: dto.nombre,
      email: dto.correo,
      phone: dto.telefono,
      notes: dto.mensaje ?? null,
      originCompany: companyName,
      sourceId: source.id,
      currentStage: stage,
    } as any);

    await repo.save(lead);
    this.logger.log(`[${tenantSlug}] Lead web creado: ${dto.nombre} (${dto.correo})`);
  }

  private async getOrCreateSource(name: string, channel: string): Promise<LeadSource> {
    const repo = await this.tds.getRepository(LeadSource);
    let source = await repo.findOne({ where: { name } });
    if (!source) {
      source = repo.create({ name, channel });
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
