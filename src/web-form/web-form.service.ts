import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { TenantContext, TenantInfo } from "../tenant/tenant.context";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";
import { Contact } from "../marketing/contacts/Contact";
import { LeadSource } from "../marketing/lead-sources/LeadSource";
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
          await this.saveContact(dto, t.slug);
        });
        return;
      }
    }

    throw new UnauthorizedException("API key inválida");
  }

  private async saveContact(dto: SubmitFormDto, tenantSlug: string): Promise<void> {
    const source = await this.getOrCreateSource("Formulario Web", "web");

    const repo = await this.tds.getRepository(Contact);
    const contact = repo.create({
      full_name: dto.nombre,
      email: dto.correo ?? null,
      phone: dto.telefono ?? null,
      notes: dto.mensaje ?? null,
      type: "lead",
      status: "new",
      source_id: source.id,
    });

    await repo.save(contact);
    this.logger.log(`[${tenantSlug}] Contacto web creado: ${dto.nombre} (${dto.correo})`);
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
}
