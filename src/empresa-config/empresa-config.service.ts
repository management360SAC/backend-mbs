import { Injectable, BadRequestException } from "@nestjs/common";
import { randomBytes } from "crypto";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { EmpresaConfig } from "./EmpresaConfig";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";
import { SendEmailDto } from "./dto/send-email.dto";

@Injectable()
export class EmpresaConfigService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async get(): Promise<EmpresaConfig> {
    const repo = await this.tds.getRepository(EmpresaConfig);
    let config = await repo.findOne({ where: { id: 1 } });
    if (!config) {
      config = repo.create({ id: 1, nombre: "MBS" });
      await repo.save(config);
    }
    return config;
  }

  async update(dto: UpdateEmpresaConfigDto): Promise<EmpresaConfig> {
    const repo = await this.tds.getRepository(EmpresaConfig);
    const config = await this.get();
    Object.assign(config, dto);
    return repo.save(config);
  }

  async regenerateWebFormKey(): Promise<{ web_form_api_key: string }> {
    const repo = await this.tds.getRepository(EmpresaConfig);
    const config = await this.get();
    config.web_form_api_key = randomBytes(32).toString("hex");
    await repo.save(config);
    return { web_form_api_key: config.web_form_api_key };
  }

  async sendEmail(dto: SendEmailDto): Promise<{ ok: boolean; error?: string }> {
    const config = await this.get();
    if (!config.smtp_host) {
      throw new BadRequestException("SMTP no configurado. Configúralo en Configuración → Empresa.");
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: config.smtp_host,
      port: config.smtp_port ?? 587,
      secure: (config.smtp_port ?? 587) === 465,
      auth: { user: config.smtp_user, pass: config.smtp_pass },
      tls: { rejectUnauthorized: false },
    });
    await transporter.sendMail({
      from: config.smtp_from ?? config.smtp_user,
      to: dto.to,
      subject: dto.subject,
      html: dto.body,
    });
    return { ok: true };
  }
}
