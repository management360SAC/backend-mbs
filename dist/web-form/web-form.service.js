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
var WebFormService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebFormService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const tenant_context_1 = require("../tenant/tenant.context");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
const Contact_1 = require("../marketing/contacts/Contact");
const LeadSource_1 = require("../marketing/lead-sources/LeadSource");
let WebFormService = WebFormService_1 = class WebFormService {
    prisma;
    tds;
    logger = new common_1.Logger(WebFormService_1.name);
    constructor(prisma, tds) {
        this.prisma = prisma;
        this.tds = tds;
    }
    async submitLead(apiKey, dto) {
        const tenants = await this.prisma.$queryRaw `SELECT id, slug, db_name, db_host, db_port, db_user, db_pass FROM tenants WHERE is_active = 1`;
        for (const t of tenants) {
            const info = {
                id: t.id, slug: t.slug, dbName: t.db_name,
                dbHost: t.db_host, dbPort: t.db_port, dbUser: t.db_user, dbPass: t.db_pass,
            };
            const matched = await tenant_context_1.TenantContext.run(info, async () => {
                const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
                const config = await repo.findOne({ where: { id: 1 } });
                return config?.web_form_api_key === apiKey ? config : null;
            });
            if (matched) {
                await tenant_context_1.TenantContext.run(info, async () => {
                    await this.saveContact(dto, t.slug);
                });
                return;
            }
        }
        throw new common_1.UnauthorizedException("API key inválida");
    }
    async saveContact(dto, tenantSlug) {
        const source = await this.getOrCreateSource("Formulario Web", "web");
        const repo = await this.tds.getRepository(Contact_1.Contact);
        const contact = repo.create({
            full_name: dto.nombre,
            email: dto.correo ?? null,
            phone: dto.telefono ?? null,
            type: "lead",
            status: "new",
            source_id: source.id,
        });
        await repo.save(contact);
        this.logger.log(`[${tenantSlug}] Contacto web creado: ${dto.nombre} (${dto.correo})`);
    }
    async getOrCreateSource(name, channel) {
        const repo = await this.tds.getRepository(LeadSource_1.LeadSource);
        let source = await repo.findOne({ where: { name } });
        if (!source) {
            source = repo.create({ name, channel });
            await repo.save(source);
        }
        return source;
    }
};
exports.WebFormService = WebFormService;
exports.WebFormService = WebFormService = WebFormService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tenant_datasource_service_1.TenantDataSourceService])
], WebFormService);
//# sourceMappingURL=web-form.service.js.map