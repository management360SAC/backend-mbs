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
var TenantMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_context_1 = require("./tenant.context");
const tenant_datasource_service_1 = require("./tenant-datasource.service");
function decodeJwtPayload(token) {
    try {
        const [, b64] = token.split(".");
        return JSON.parse(Buffer.from(b64, "base64url").toString("utf8"));
    }
    catch {
        return null;
    }
}
let TenantMiddleware = TenantMiddleware_1 = class TenantMiddleware {
    prisma;
    tds;
    logger = new common_1.Logger(TenantMiddleware_1.name);
    constructor(prisma, tds) {
        this.prisma = prisma;
        this.tds = tds;
    }
    async use(req, _res, next) {
        const auth = req.headers["authorization"];
        if (!auth?.startsWith("Bearer "))
            return next();
        const token = auth.slice(7);
        const payload = decodeJwtPayload(token);
        if (!payload?.tenantSlug)
            return next();
        try {
            const tenant = await this.prisma.tenant.findUnique({
                where: { slug: payload.tenantSlug, isActive: true },
            });
            if (!tenant) {
                this.logger.warn(`Tenant not found or inactive: ${payload.tenantSlug}`);
                return next();
            }
            const tenantInfo = {
                id: tenant.id,
                slug: tenant.slug,
                dbName: tenant.dbName,
                dbHost: tenant.dbHost,
                dbPort: tenant.dbPort,
                dbUser: tenant.dbUser,
                dbPass: tenant.dbPass,
            };
            await this.tds.getDataSource(tenantInfo);
            tenant_context_1.TenantContext.run(tenantInfo, () => next());
        }
        catch (err) {
            this.logger.error("TenantMiddleware error", err);
            next();
        }
    }
};
exports.TenantMiddleware = TenantMiddleware;
exports.TenantMiddleware = TenantMiddleware = TenantMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tenant_datasource_service_1.TenantDataSourceService])
], TenantMiddleware);
//# sourceMappingURL=tenant.middleware.js.map