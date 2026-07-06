"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaConfigService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const EmpresaConfig_1 = require("./EmpresaConfig");
let EmpresaConfigService = class EmpresaConfigService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async get() {
        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
        let config = await repo.findOne({ where: { id: 1 } });
        if (!config) {
            config = repo.create({ id: 1, nombre: "MBS" });
            await repo.save(config);
        }
        return config;
    }
    async update(dto) {
        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
        const config = await this.get();
        Object.assign(config, dto);
        return repo.save(config);
    }
    async regenerateWebFormKey() {
        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
        const config = await this.get();
        config.web_form_api_key = (0, crypto_1.randomBytes)(32).toString("hex");
        await repo.save(config);
        return { web_form_api_key: config.web_form_api_key };
    }
    async sendEmail(dto) {
        const config = await this.get();
        if (!config.smtp_host) {
            throw new common_1.BadRequestException("SMTP no configurado. Configúralo en Configuración → Empresa.");
        }
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
};
exports.EmpresaConfigService = EmpresaConfigService;
exports.EmpresaConfigService = EmpresaConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], EmpresaConfigService);
//# sourceMappingURL=empresa-config.service.js.map