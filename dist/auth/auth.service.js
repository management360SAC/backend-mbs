"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const audit_service_1 = require("../audit/audit.service");
const user_entity_1 = require("../users/user.entity");
let AuthService = class AuthService {
    jwtService;
    prisma;
    tds;
    audit;
    constructor(jwtService, prisma, tds, audit) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.tds = tds;
        this.audit = audit;
    }
    async login(email, password, tenantSlug, ip, userAgent) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { slug: tenantSlug, isActive: true },
        });
        if (!tenant) {
            throw new common_1.UnauthorizedException("Tenant no encontrado o inactivo");
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
        const userRepo = await this.tds.getRepository(user_entity_1.User, tenantInfo);
        const user = await userRepo.findOne({
            where: { email },
            relations: { userRoles: { role: true } },
        });
        if (!user || !user.isActive) {
            await this.audit.log({ tenantSlug, userEmail: email, ip, userAgent, action: "LOGIN_FAILED", module: "auth", result: "failure", metadata: { reason: "user_not_found_or_inactive" } });
            throw new common_1.UnauthorizedException("Credenciales inválidas");
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            await this.audit.log({ tenantSlug, userId: user.id, userEmail: email, ip, userAgent, action: "LOGIN_FAILED", module: "auth", result: "failure", metadata: { reason: "wrong_password" } });
            throw new common_1.UnauthorizedException("Credenciales inválidas");
        }
        const roles = (user.userRoles ?? []).map((ur) => ur.role?.code).filter(Boolean);
        const payload = {
            sub: user.id,
            email: user.email,
            fullName: user.fullName,
            roles,
            tenantId: tenant.id,
            tenantSlug: tenant.slug,
        };
        const accessToken = this.jwtService.sign(payload);
        await userRepo.update(user.id, { lastLoginAt: new Date() });
        await this.audit.log({ tenantSlug, userId: user.id, userEmail: user.email, ip, userAgent, action: "LOGIN_SUCCESS", module: "auth", result: "success" });
        return {
            access_token: accessToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isActive: user.isActive,
                roles,
                tenantId: tenant.id,
                tenantSlug: tenant.slug,
                tenantName: tenant.name,
            },
        };
    }
    async validateUser(userId, tenantSlug) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { slug: tenantSlug, isActive: true },
        });
        if (!tenant)
            throw new common_1.UnauthorizedException("Tenant inactivo");
        const tenantInfo = {
            id: tenant.id,
            slug: tenant.slug,
            dbName: tenant.dbName,
            dbHost: tenant.dbHost,
            dbPort: tenant.dbPort,
            dbUser: tenant.dbUser,
            dbPass: tenant.dbPass,
        };
        const userRepo = await this.tds.getRepository(user_entity_1.User, tenantInfo);
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: { userRoles: { role: true } },
        });
        if (!user || !user.isActive)
            throw new common_1.UnauthorizedException("Usuario no encontrado o inactivo");
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            roles: (user.userRoles ?? []).map((ur) => ur.role?.code).filter(Boolean),
            tenantId: tenant.id,
            tenantSlug: tenant.slug,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        tenant_datasource_service_1.TenantDataSourceService,
        audit_service_1.AuditService])
], AuthService);
//# sourceMappingURL=auth.service.js.map