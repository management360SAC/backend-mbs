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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const tenant_provisioning_service_1 = require("./tenant-provisioning.service");
const db_reset_service_1 = require("./db-reset.service");
const create_tenant_dto_1 = require("./dto/create-tenant.dto");
const users_dto_1 = require("../users/dto/users.dto");
const update_empresa_config_dto_1 = require("../empresa-config/dto/update-empresa-config.dto");
const audit_service_1 = require("../audit/audit.service");
let AdminController = class AdminController {
    service;
    audit;
    dbReset;
    constructor(service, audit, dbReset) {
        this.service = service;
        this.audit = audit;
        this.dbReset = dbReset;
    }
    listTenantsPublic() {
        return this.service.listTenantsPublic();
    }
    listTenants() {
        return this.service.listTenants();
    }
    provision(dto) {
        return this.service.provision(dto);
    }
    listTenantUsers(slug) {
        return this.service.listTenantUsers(slug);
    }
    createTenantUser(slug, dto) {
        return this.service.createTenantUser(slug, dto);
    }
    getTenantConfig(slug) {
        return this.service.getTenantConfig(slug);
    }
    updateTenantConfig(slug, dto) {
        return this.service.updateTenantConfig(slug, dto);
    }
    syncRolesToChildren(slug) {
        return this.service.syncRolesToChildren(slug);
    }
    getAuditLogs(req, page, limit, action) {
        return this.audit.list(req.user.tenantSlug, {
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 50,
            action,
        });
    }
    getAllLeads(req, q, status, sourceId, page, limit) {
        return this.service.getAllTenantsLeads({
            tenantSlug: req.user.tenantSlug,
            q,
            status,
            sourceId: sourceId ? Number(sourceId) : undefined,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });
    }
    async runDbReset(token) {
        const expected = process.env.TOKEN_META;
        if (!expected || token !== expected)
            throw new common_1.ForbiddenException("Token inválido");
        return this.dbReset.runReset();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("tenants/public"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listTenantsPublic", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("tenants"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listTenants", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("tenants"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "provision", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("tenants/:slug/users"),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listTenantUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("tenants/:slug/users"),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createTenantUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("tenants/:slug/config"),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getTenantConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("tenants/:slug/config"),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_empresa_config_dto_1.UpdateEmpresaConfigDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTenantConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("tenants/:slug/sync-roles"),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "syncRolesToChildren", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("audit-logs"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("limit")),
    __param(3, (0, common_1.Query)("action")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("leads"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("q")),
    __param(2, (0, common_1.Query)("status")),
    __param(3, (0, common_1.Query)("source_id")),
    __param(4, (0, common_1.Query)("page")),
    __param(5, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllLeads", null);
__decorate([
    (0, common_1.Post)("db-reset"),
    __param(0, (0, common_1.Headers)("x-reset-token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "runDbReset", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [tenant_provisioning_service_1.TenantProvisioningService,
        audit_service_1.AuditService,
        db_reset_service_1.DbResetService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map