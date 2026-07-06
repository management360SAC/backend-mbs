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
var TenantProvisioningService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantProvisioningService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_entities_1 = require("../tenant/tenant-entities");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const user_entity_1 = require("../users/user.entity");
const role_entity_1 = require("../roles/role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
const user_role_entity_1 = require("../users/user-role.entity");
const LeadStages_1 = require("../marketing/lead-stages/LeadStages");
const Contact_1 = require("../marketing/contacts/Contact");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
const DEFAULT_PERMISSIONS = [
    { code: "users.create", module: "users", action: "create", description: "Crear usuarios" },
    { code: "users.read", module: "users", action: "read", description: "Ver usuarios" },
    { code: "users.update", module: "users", action: "update", description: "Editar usuarios" },
    { code: "users.delete", module: "users", action: "delete", description: "Eliminar usuarios" },
    { code: "roles.create", module: "roles", action: "create", description: "Crear roles" },
    { code: "roles.read", module: "roles", action: "read", description: "Ver roles" },
    { code: "roles.update", module: "roles", action: "update", description: "Editar roles" },
    { code: "roles.delete", module: "roles", action: "delete", description: "Eliminar roles" },
    { code: "permissions.read", module: "permissions", action: "read", description: "Ver permisos" },
    { code: "permissions.assign", module: "permissions", action: "assign", description: "Asignar permisos" },
    { code: "funnel.read", module: "funnel", action: "read", description: "Ver embudo" },
    { code: "funnel.manage", module: "funnel", action: "manage", description: "Gestionar embudo" },
    { code: "marketing.read", module: "marketing", action: "read", description: "Ver marketing" },
    { code: "marketing.manage", module: "marketing", action: "manage", description: "Gestionar marketing" },
];
const DEFAULT_LEAD_STAGES = [
    { name: "Nuevo", order: 1, isActive: true, isFinal: false },
    { name: "Contactado", order: 2, isActive: true, isFinal: false },
    { name: "Calificado", order: 3, isActive: true, isFinal: false },
    { name: "Propuesta enviada", order: 4, isActive: true, isFinal: false },
    { name: "Negociacion", order: 5, isActive: true, isFinal: false },
    { name: "Ganado", order: 6, isActive: true, isFinal: true },
    { name: "Perdido", order: 7, isActive: true, isFinal: true },
];
let TenantProvisioningService = TenantProvisioningService_1 = class TenantProvisioningService {
    prisma;
    tds;
    logger = new common_1.Logger(TenantProvisioningService_1.name);
    constructor(prisma, tds) {
        this.prisma = prisma;
        this.tds = tds;
    }
    async listTenantsPublic() {
        try {
            return await this.prisma.tenant.findMany({
                where: { isActive: true },
                orderBy: { name: "asc" },
                select: { slug: true, name: true },
            });
        }
        catch (err) {
            this.logger.error("listTenantsPublic error:", err?.message, err?.stack);
            throw new Error(`DB error: ${err?.message ?? String(err)}`);
        }
    }
    async listTenants() {
        return this.prisma.tenant.findMany({
            orderBy: { id: "asc" },
            select: { id: true, name: true, slug: true, dbName: true, dbHost: true, dbPort: true, isActive: true, createdAt: true, updatedAt: true },
        });
    }
    async provision(dto) {
        const slug = dto.slug.toLowerCase().trim();
        const dbName = `crm_tenant_${slug.replace(/-/g, "_")}`;
        const existing = await this.prisma.tenant.findFirst({ where: { OR: [{ slug }, { dbName }] } });
        if (existing) {
            throw new common_1.ConflictException(`Ya existe un tenant con slug '${slug}' o db '${dbName}'`);
        }
        const adminUrl = process.env.DATABASE_ADMIN_URL;
        if (!adminUrl)
            throw new common_1.BadRequestException("DATABASE_ADMIN_URL no configurada");
        const { host, port, username, password } = this.parseUrl(adminUrl);
        const adminDs = new typeorm_1.DataSource({
            type: "mysql",
            host, port, username, password,
            database: "mysql",
            synchronize: false,
        });
        await adminDs.initialize();
        try {
            await adminDs.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
            await adminDs.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO 'crm'@'%'`);
            await adminDs.query(`FLUSH PRIVILEGES`);
            this.logger.log(`Database created: ${dbName}`);
        }
        finally {
            await adminDs.destroy();
        }
        const tenantInfo = { id: 0, slug, dbName, dbHost: host, dbPort: port, dbUser: "crm", dbPass: "crm" };
        const schemaDs = new typeorm_1.DataSource({
            type: "mysql",
            host,
            port,
            username: "crm",
            password: "crm",
            database: dbName,
            entities: tenant_entities_1.TENANT_ENTITIES,
            synchronize: true,
        });
        await schemaDs.initialize();
        this.logger.log(`Schema synchronized for: ${dbName}`);
        await this.seedTenantData(schemaDs, dto);
        await schemaDs.destroy();
        let parentId = null;
        if (dto.parentSlug) {
            const parent = await this.prisma.tenant.findUnique({ where: { slug: dto.parentSlug } });
            if (parent)
                parentId = parent.id;
        }
        const tenant = await this.prisma.tenant.create({
            data: { name: dto.name, slug, dbName, dbHost: host, dbPort: port, dbUser: "crm", dbPass: "crm", isActive: true, ...(parentId ? { parentId } : {}) },
        });
        if (parentId && dto.parentSlug) {
            await this.copyRolesFromParent(dto.parentSlug, schemaDs).catch((e) => this.logger.warn(`Could not copy parent roles: ${e.message}`));
        }
        this.logger.log(`Tenant provisioned: ${slug} (id=${tenant.id})`);
        return tenant;
    }
    async copyRolesFromParent(parentSlug, childDs) {
        const parentInfo = await this.resolveTenantInfo(parentSlug);
        const parentRoleRepo = await this.tds.getRepository(role_entity_1.Role, parentInfo);
        const parentRpRepo = await this.tds.getRepository(role_permission_entity_1.RolePermission, parentInfo);
        const parentPermRepo = await this.tds.getRepository(permission_entity_1.Permission, parentInfo);
        const parentRoles = await parentRoleRepo.find({ relations: { rolePermissions: { permission: true } } });
        const childRoleRepo = childDs.getRepository(role_entity_1.Role);
        const childPermRepo = childDs.getRepository(permission_entity_1.Permission);
        const childRpRepo = childDs.getRepository(role_permission_entity_1.RolePermission);
        for (const pr of parentRoles) {
            let childRole = await childRoleRepo.findOne({ where: { code: pr.code } });
            if (!childRole) {
                childRole = await childRoleRepo.save(childRoleRepo.create({ code: pr.code, name: pr.name, description: pr.description, isSystem: pr.isSystem }));
            }
            else {
                await childRoleRepo.update({ id: childRole.id }, { name: pr.name, description: pr.description });
                childRole = (await childRoleRepo.findOne({ where: { id: childRole.id } }));
            }
            const permCodes = (pr.rolePermissions ?? []).map((rp) => rp.permission?.code).filter(Boolean);
            if (permCodes.length > 0) {
                const childPerms = await childPermRepo.find({ where: { code: (0, typeorm_1.In)(permCodes) } });
                await childRpRepo.delete({ roleId: childRole.id });
                for (const cp of childPerms) {
                    await childRpRepo.save(childRpRepo.create({ roleId: childRole.id, permissionId: cp.id }));
                }
            }
        }
        this.logger.log(`Roles copied from parent '${parentSlug}' to child`);
    }
    async syncRolesToChildren(parentSlug) {
        const parentTenant = await this.prisma.tenant.findUnique({ where: { slug: parentSlug } });
        if (!parentTenant)
            throw new common_1.NotFoundException(`Empresa '${parentSlug}' no encontrada`);
        const children = await this.prisma.tenant.findMany({ where: { parentId: parentTenant.id } });
        if (children.length === 0)
            return { synced: 0, message: "No hay empresas hijas" };
        const parentInfo = await this.resolveTenantInfo(parentSlug);
        const parentRoleRepo = await this.tds.getRepository(role_entity_1.Role, parentInfo);
        const parentRoles = await parentRoleRepo.find({ relations: { rolePermissions: { permission: true } } });
        let synced = 0;
        for (const child of children) {
            const childInfo = { id: child.id, slug: child.slug, dbName: child.dbName, dbHost: child.dbHost, dbPort: child.dbPort, dbUser: child.dbUser, dbPass: child.dbPass };
            const childRoleRepo = await this.tds.getRepository(role_entity_1.Role, childInfo);
            const childPermRepo = await this.tds.getRepository(permission_entity_1.Permission, childInfo);
            const childRpRepo = await this.tds.getRepository(role_permission_entity_1.RolePermission, childInfo);
            for (const pr of parentRoles) {
                let childRole = await childRoleRepo.findOne({ where: { code: pr.code } });
                if (!childRole) {
                    childRole = await childRoleRepo.save(childRoleRepo.create({ code: pr.code, name: pr.name, description: pr.description, isSystem: pr.isSystem }));
                }
                else {
                    await childRoleRepo.update({ id: childRole.id }, { name: pr.name, description: pr.description });
                    childRole = (await childRoleRepo.findOne({ where: { id: childRole.id } }));
                }
                const permCodes = (pr.rolePermissions ?? []).map((rp) => rp.permission?.code).filter(Boolean);
                if (permCodes.length > 0) {
                    const childPerms = await childPermRepo.find({ where: { code: (0, typeorm_1.In)(permCodes) } });
                    await childRpRepo.delete({ roleId: childRole.id });
                    for (const cp of childPerms) {
                        await childRpRepo.save(childRpRepo.create({ roleId: childRole.id, permissionId: cp.id }));
                    }
                }
            }
            synced++;
        }
        return { synced, message: `Roles sincronizados a ${synced} empresa(s) hija(s)` };
    }
    async seedTenantData(ds, dto) {
        const permRepo = ds.getRepository(permission_entity_1.Permission);
        const savedPerms = [];
        for (const p of DEFAULT_PERMISSIONS) {
            let perm = await permRepo.findOne({ where: { code: p.code } });
            if (!perm)
                perm = await permRepo.save(permRepo.create(p));
            savedPerms.push(perm);
        }
        const roleRepo = ds.getRepository(role_entity_1.Role);
        let adminRole = await roleRepo.findOne({ where: { code: "ADMIN" } });
        if (!adminRole) {
            adminRole = await roleRepo.save(roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo al sistema", isSystem: true }));
        }
        const rpRepo = ds.getRepository(role_permission_entity_1.RolePermission);
        for (const perm of savedPerms) {
            const exists = await rpRepo.findOne({ where: { roleId: adminRole.id, permissionId: perm.id } });
            if (!exists)
                await rpRepo.save(rpRepo.create({ roleId: adminRole.id, permissionId: perm.id }));
        }
        let vendedorRole = await roleRepo.findOne({ where: { code: "VENDEDOR" } });
        if (!vendedorRole) {
            vendedorRole = await roleRepo.save(roleRepo.create({ code: "VENDEDOR", name: "Vendedor", description: "Acceso a ventas y marketing", isSystem: false }));
        }
        const vendedorPerms = savedPerms.filter((p) => ["funnel.read", "funnel.manage", "marketing.read", "marketing.manage"].includes(p.code));
        for (const perm of vendedorPerms) {
            const exists = await rpRepo.findOne({ where: { roleId: vendedorRole.id, permissionId: perm.id } });
            if (!exists)
                await rpRepo.save(rpRepo.create({ roleId: vendedorRole.id, permissionId: perm.id }));
        }
        const userRepo = ds.getRepository(user_entity_1.User);
        const adminEmail = dto.adminEmail ?? "admin@crm.local";
        let adminUser = await userRepo.findOne({ where: { email: adminEmail } });
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(dto.adminPassword ?? "admin123", salt);
            adminUser = await userRepo.save(userRepo.create({ email: adminEmail, fullName: dto.adminFullName ?? "Admin", isActive: true, passwordHash: hash, lastLoginAt: null }));
        }
        const urRepo = ds.getRepository(user_role_entity_1.UserRole);
        const urExists = await urRepo.findOne({ where: { userId: adminUser.id, roleId: adminRole.id } });
        if (!urExists)
            await urRepo.save(urRepo.create({ userId: adminUser.id, roleId: adminRole.id }));
        const stageRepo = ds.getRepository(LeadStages_1.LeadStage);
        for (const s of DEFAULT_LEAD_STAGES) {
            const exists = await stageRepo.findOne({ where: { name: s.name } });
            if (!exists)
                await stageRepo.save(stageRepo.create(s));
        }
        this.logger.log(`Default data seeded for new tenant`);
    }
    parseUrl(url) {
        const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)/);
        if (!match)
            throw new common_1.BadRequestException("Invalid DATABASE_ADMIN_URL format");
        return { username: match[1], password: match[2], host: match[3], port: Number(match[4]) };
    }
    async resolveTenantInfo(slug) {
        const tenant = await this.prisma.tenant.findUnique({ where: { slug } });
        if (!tenant)
            throw new common_1.NotFoundException(`Empresa '${slug}' no encontrada`);
        return { id: tenant.id, slug: tenant.slug, dbName: tenant.dbName, dbHost: tenant.dbHost, dbPort: tenant.dbPort, dbUser: tenant.dbUser, dbPass: tenant.dbPass };
    }
    async listTenantUsers(slug) {
        const info = await this.resolveTenantInfo(slug);
        const repo = await this.tds.getRepository(user_entity_1.User, info);
        const users = await repo.find({
            relations: { userRoles: { role: true } },
            order: { createdAt: "DESC" },
        });
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            full_name: u.fullName,
            is_active: u.isActive,
            last_login_at: u.lastLoginAt,
            created_at: u.createdAt,
            roles: (u.userRoles ?? []).map((ur) => ur.role).filter(Boolean).map((r) => ({ id: r.id, code: r.code, name: r.name })),
        }));
    }
    async createTenantUser(slug, dto) {
        const info = await this.resolveTenantInfo(slug);
        const repo = await this.tds.getRepository(user_entity_1.User, info);
        const email = dto.email.trim().toLowerCase();
        const exists = await repo.findOne({ where: { email } });
        if (exists)
            throw new common_1.ConflictException("Email already exists");
        const user = repo.create({ email, fullName: dto.full_name.trim(), isActive: dto.is_active ?? true, lastLoginAt: null });
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(dto.password, salt);
        const saved = await repo.save(user);
        if (dto.role_ids?.length) {
            const urRepo = await this.tds.getRepository(user_role_entity_1.UserRole, info);
            const roleRepo = await this.tds.getRepository(role_entity_1.Role, info);
            const uniqueIds = Array.from(new Set(dto.role_ids.map(Number).filter(Boolean)));
            const roles = await roleRepo.find({ where: { id: (0, typeorm_1.In)(uniqueIds) } });
            for (const role of roles) {
                await urRepo.save(urRepo.create({ userId: saved.id, roleId: role.id }));
            }
        }
        const full = await repo.findOne({ where: { id: saved.id }, relations: { userRoles: { role: true } } });
        const u = full;
        return {
            id: u.id, email: u.email, full_name: u.fullName, is_active: u.isActive, last_login_at: u.lastLoginAt, created_at: u.createdAt,
            roles: (u.userRoles ?? []).map((ur) => ur.role).filter(Boolean).map((r) => ({ id: r.id, code: r.code, name: r.name })),
        };
    }
    async getTenantConfig(slug) {
        const info = await this.resolveTenantInfo(slug);
        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig, info);
        let config = await repo.findOne({ where: { id: 1 } });
        if (!config) {
            config = repo.create({ id: 1, nombre: slug });
            await repo.save(config);
        }
        return config;
    }
    async getAllTenantsLeads(params) {
        const prismaCurrentTenant = await this.prisma.tenant.findUnique({ where: { slug: params.tenantSlug } });
        if (!prismaCurrentTenant)
            return { items: [], meta: { total: 0, page: 1, limit: params.limit, totalPages: 0 } };
        const children = await this.prisma.tenant.findMany({
            where: { parentId: prismaCurrentTenant.id, isActive: true },
        });
        const allTenants = [
            { prisma: prismaCurrentTenant },
            ...children.map((c) => ({ prisma: c })),
        ];
        const allItems = [];
        for (const { prisma: t } of allTenants) {
            const info = {
                id: t.id, slug: t.slug, dbName: t.dbName,
                dbHost: t.dbHost, dbPort: t.dbPort, dbUser: t.dbUser, dbPass: t.dbPass,
            };
            try {
                const repo = await this.tds.getRepository(Contact_1.Contact, info);
                const qb = repo.createQueryBuilder("c").where("c.type = :type", { type: "lead" });
                if (params.status)
                    qb.andWhere("c.status = :status", { status: params.status });
                if (params.sourceId)
                    qb.andWhere("c.source_id = :sid", { sid: params.sourceId });
                if (params.q) {
                    qb.andWhere("(c.full_name LIKE :q OR c.email LIKE :q OR c.phone LIKE :q)", { q: `%${params.q}%` });
                }
                const contacts = await qb.orderBy("c.id", "DESC").getMany();
                contacts.forEach((c) => allItems.push({ ...c, tenantSlug: t.slug, tenantName: t.name }));
            }
            catch {
            }
        }
        allItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const total = allItems.length;
        const start = (params.page - 1) * params.limit;
        const items = allItems.slice(start, start + params.limit);
        return { items, meta: { total, page: params.page, limit: params.limit, totalPages: Math.ceil(total / params.limit) } };
    }
    async updateTenantConfig(slug, dto) {
        const info = await this.resolveTenantInfo(slug);
        const repo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig, info);
        let config = await repo.findOne({ where: { id: 1 } });
        if (!config) {
            config = repo.create({ id: 1, nombre: slug });
        }
        Object.assign(config, dto);
        return repo.save(config);
    }
};
exports.TenantProvisioningService = TenantProvisioningService;
exports.TenantProvisioningService = TenantProvisioningService = TenantProvisioningService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tenant_datasource_service_1.TenantDataSourceService])
], TenantProvisioningService);
//# sourceMappingURL=tenant-provisioning.service.js.map