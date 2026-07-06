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
var AuditService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const audit_log_entity_1 = require("./audit-log.entity");
let AuditService = AuditService_1 = class AuditService {
    prisma;
    tds;
    logger = new common_1.Logger(AuditService_1.name);
    constructor(prisma, tds) {
        this.prisma = prisma;
        this.tds = tds;
    }
    async list(tenantSlug, opts = {}) {
        try {
            const tenant = await this.prisma.tenant.findUnique({ where: { slug: tenantSlug } });
            if (!tenant)
                return { items: [], total: 0 };
            const info = {
                id: tenant.id, slug: tenant.slug, dbName: tenant.dbName,
                dbHost: tenant.dbHost, dbPort: tenant.dbPort,
                dbUser: tenant.dbUser, dbPass: tenant.dbPass,
            };
            const repo = await this.tds.getRepository(audit_log_entity_1.AuditLog, info);
            const page = opts.page ?? 1;
            const limit = Math.min(opts.limit ?? 50, 200);
            const skip = (page - 1) * limit;
            const qb = repo.createQueryBuilder("a").orderBy("a.createdAt", "DESC").skip(skip).take(limit);
            if (opts.action)
                qb.where("a.action = :action", { action: opts.action });
            const [items, total] = await qb.getManyAndCount();
            return { items, total };
        }
        catch (err) {
            this.logger.error(`Audit list failed: ${err?.message}`);
            return { items: [], total: 0 };
        }
    }
    async log(entry) {
        try {
            const tenant = await this.prisma.tenant.findUnique({ where: { slug: entry.tenantSlug } });
            if (!tenant)
                return;
            const info = {
                id: tenant.id, slug: tenant.slug, dbName: tenant.dbName,
                dbHost: tenant.dbHost, dbPort: tenant.dbPort,
                dbUser: tenant.dbUser, dbPass: tenant.dbPass,
            };
            const repo = await this.tds.getRepository(audit_log_entity_1.AuditLog, info);
            await repo.save(repo.create({
                tenantSlug: entry.tenantSlug,
                userId: entry.userId ?? null,
                userEmail: entry.userEmail ?? null,
                ip: entry.ip ?? null,
                userAgent: entry.userAgent ? entry.userAgent.substring(0, 500) : null,
                action: entry.action,
                module: entry.module,
                entity: entry.entity ?? null,
                entityId: entry.entityId ?? null,
                result: entry.result ?? "success",
                metadata: entry.metadata ?? null,
            }));
        }
        catch (err) {
            this.logger.error(`Audit log failed: ${err?.message}`);
        }
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = AuditService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tenant_datasource_service_1.TenantDataSourceService])
], AuditService);
//# sourceMappingURL=audit.service.js.map