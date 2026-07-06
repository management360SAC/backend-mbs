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
var FacebookLeadsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookLeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const tenant_context_1 = require("../tenant/tenant.context");
const Lead_1 = require("../marketing/leads/Lead");
const LeadSource_1 = require("../marketing/lead-sources/LeadSource");
const LeadStages_1 = require("../marketing/lead-stages/LeadStages");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
let FacebookLeadsService = FacebookLeadsService_1 = class FacebookLeadsService {
    prisma;
    tds;
    logger = new common_1.Logger(FacebookLeadsService_1.name);
    constructor(prisma, tds) {
        this.prisma = prisma;
        this.tds = tds;
    }
    async processLeadgenId(leadgenId, pageId) {
        const tenants = await this.prisma.$queryRaw `
      SELECT id, slug, db_name, db_host, db_port, db_user, db_pass, parent_id
      FROM tenants
      WHERE is_active = 1
    `;
        const toTenantInfo = (t) => ({
            id: t.id,
            slug: t.slug,
            dbName: t.db_name,
            dbHost: t.db_host,
            dbPort: t.db_port,
            dbUser: t.db_user,
            dbPass: t.db_pass,
        });
        let matchedTenant;
        if (pageId) {
            for (const t of tenants) {
                const info = toTenantInfo(t);
                const found = await tenant_context_1.TenantContext.run(info, async () => {
                    const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
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
            await this.processAndPropagate(leadgenId, matchedTenant, tenants, toTenantInfo);
        }
        else {
            for (const t of tenants) {
                await tenant_context_1.TenantContext.run(toTenantInfo(t), async () => {
                    try {
                        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
                        const config = await repo.findOne({ where: { id: 1 } });
                        if (!config?.fb_page_access_token)
                            return;
                        await this.fetchAndSaveLead(leadgenId, config.fb_page_access_token, config.nombre, t.slug);
                    }
                    catch (err) {
                        this.logger.error(`[${t.slug}] Error procesando leadgen_id ${leadgenId}: ${err}`);
                    }
                });
            }
        }
    }
    async processAndPropagate(leadgenId, tenant, allTenants, toInfo) {
        const companyName = await tenant_context_1.TenantContext.run(toInfo(tenant), async () => {
            try {
                const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
                const config = await repo.findOne({ where: { id: 1 } });
                if (!config?.fb_page_access_token)
                    return null;
                await this.fetchAndSaveLead(leadgenId, config.fb_page_access_token, config.nombre, tenant.slug);
                return config.nombre;
            }
            catch (err) {
                this.logger.error(`[${tenant.slug}] Error: ${err}`);
                return null;
            }
        });
        if (tenant.parent_id && companyName) {
            const parentTenant = allTenants.find((t) => t.id === tenant.parent_id);
            if (parentTenant) {
                await tenant_context_1.TenantContext.run(toInfo(parentTenant), async () => {
                    try {
                        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
                        const config = await repo.findOne({ where: { id: 1 } });
                        if (!config?.fb_page_access_token)
                            return;
                        await this.fetchAndSaveLead(leadgenId, config.fb_page_access_token, companyName, parentTenant.slug);
                    }
                    catch (err) {
                        this.logger.error(`[${parentTenant.slug}] Error al copiar lead desde ${tenant.slug}: ${err}`);
                    }
                });
            }
        }
    }
    async fetchAndSaveLead(leadgenId, accessToken, originCompany, tenantSlug) {
        const url = `https://graph.facebook.com/v20.0/${leadgenId}?fields=field_data,created_time&access_token=${accessToken}`;
        let fbData;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                const body = await res.text();
                this.logger.error(`[${tenantSlug}] Error Graph API: ${res.status} ${body}`);
                return;
            }
            fbData = (await res.json());
        }
        catch (err) {
            this.logger.error(`[${tenantSlug}] Fallo al llamar Graph API: ${err}`);
            return;
        }
        const fields = fbData.field_data ?? [];
        const get = (names) => {
            for (const n of names) {
                const f = fields.find((f) => f.name === n);
                if (f?.values?.[0])
                    return f.values[0];
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
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const existing = await repo.findOne({ where: { fbLeadgenId: leadgenId } });
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
        });
        await repo.save(lead);
        this.logger.log(`[${tenantSlug}] Lead creado: ${fullName} — empresa: ${originCompany} (leadgen_id: ${leadgenId})`);
    }
    async getOrCreateFacebookSource() {
        const repo = await this.tds.getRepository(LeadSource_1.LeadSource);
        let source = await repo.findOne({ where: { name: "Facebook Ads" } });
        if (!source) {
            source = repo.create({ name: "Facebook Ads", channel: "facebook" });
            await repo.save(source);
        }
        return source;
    }
    async getFirstStage() {
        const repo = await this.tds.getRepository(LeadStages_1.LeadStage);
        return repo.findOne({
            where: { isActive: true, isFinal: false },
            order: { order: "ASC" },
        });
    }
};
exports.FacebookLeadsService = FacebookLeadsService;
exports.FacebookLeadsService = FacebookLeadsService = FacebookLeadsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tenant_datasource_service_1.TenantDataSourceService])
], FacebookLeadsService);
//# sourceMappingURL=facebook-leads.service.js.map