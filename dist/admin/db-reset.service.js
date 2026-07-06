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
var DbResetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbResetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
const tenant_entities_1 = require("../tenant/tenant-entities");
const user_entity_1 = require("../users/user.entity");
const user_role_entity_1 = require("../users/user-role.entity");
const role_entity_1 = require("../roles/role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
const LeadStages_1 = require("../marketing/lead-stages/LeadStages");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
const ADMIN_EMAIL = "toledo@zentra.com";
const ADMIN_PASSWORD = "admin12345@";
const ADMIN_FULLNAME = "Daniel Toledo";
const TENANTS = [
    { name: "Management 360", slug: "management360", parentSlug: null },
    { name: "MBS", slug: "mbs", parentSlug: "management360" },
];
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
let DbResetService = DbResetService_1 = class DbResetService {
    prisma;
    logger = new common_1.Logger(DbResetService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async runReset() {
        const steps = [];
        const adminUrl = process.env.DATABASE_ADMIN_URL;
        if (!adminUrl)
            throw new Error("DATABASE_ADMIN_URL not set");
        const { host, port, username, password } = this.parseUrl(adminUrl);
        const dbUser = process.env.DB_USER ?? "crm";
        const dbPass = process.env.DB_PASS ?? "crm";
        const rootDs = new typeorm_1.DataSource({ type: "mysql", host, port, username, password, database: "mysql", synchronize: false });
        await rootDs.initialize();
        const dbs = await rootDs.query("SHOW DATABASES LIKE 'crm_tenant_%'");
        const tenantDbs = dbs.map((r) => Object.values(r)[0]);
        for (const db of tenantDbs) {
            await rootDs.query(`DROP DATABASE IF EXISTS \`${db}\``);
            steps.push(`Dropped database: ${db}`);
            this.logger.log(`Dropped: ${db}`);
        }
        await rootDs.destroy();
        await this.prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");
        await this.prisma.$executeRawUnsafe("DELETE FROM tenants");
        await this.prisma.$executeRawUnsafe("ALTER TABLE tenants AUTO_INCREMENT = 1");
        await this.prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");
        steps.push("Cleared tenants table");
        const tenantMap = {};
        for (const t of TENANTS) {
            const slug = t.slug;
            const dbName = `crm_tenant_${slug.replace(/-/g, "_")}`;
            const adminDs = new typeorm_1.DataSource({ type: "mysql", host, port, username, password, database: "mysql", synchronize: false });
            await adminDs.initialize();
            await adminDs.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
            await adminDs.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'%'`);
            await adminDs.query("FLUSH PRIVILEGES");
            await adminDs.destroy();
            steps.push(`Created database: ${dbName}`);
            const ds = new typeorm_1.DataSource({ type: "mysql", host, port, username: dbUser, password: dbPass, database: dbName, entities: tenant_entities_1.TENANT_ENTITIES, synchronize: true });
            await ds.initialize();
            steps.push(`Schema synchronized: ${dbName}`);
            await this.seedTenant(ds);
            await ds.destroy();
            steps.push(`Seeded tenant: ${slug} (user: ${ADMIN_EMAIL})`);
            const parentId = t.parentSlug ? (tenantMap[t.parentSlug] ?? null) : null;
            const tenant = await this.prisma.tenant.create({
                data: { name: t.name, slug, dbName, dbHost: host, dbPort: port, dbUser, dbPass, isActive: true, ...(parentId ? { parentId } : {}) },
            });
            tenantMap[slug] = tenant.id;
            steps.push(`Tenant registered: ${t.name} (id=${tenant.id})`);
            this.logger.log(`Tenant ready: ${t.name}`);
        }
        return { ok: true, steps };
    }
    async seedTenant(ds) {
        const permRepo = ds.getRepository(permission_entity_1.Permission);
        const savedPerms = [];
        for (const p of DEFAULT_PERMISSIONS) {
            let perm = await permRepo.findOne({ where: { code: p.code } });
            if (!perm)
                perm = await permRepo.save(permRepo.create(p));
            savedPerms.push(perm);
        }
        const roleRepo = ds.getRepository(role_entity_1.Role);
        const rpRepo = ds.getRepository(role_permission_entity_1.RolePermission);
        let adminRole = await roleRepo.findOne({ where: { code: "ADMIN" } });
        if (!adminRole) {
            adminRole = await roleRepo.save(roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo al sistema", isSystem: true }));
        }
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
        let adminUser = await userRepo.findOne({ where: { email: ADMIN_EMAIL } });
        if (!adminUser) {
            const hash = await bcrypt.hash(ADMIN_PASSWORD, await bcrypt.genSalt(10));
            adminUser = await userRepo.save(userRepo.create({ email: ADMIN_EMAIL, fullName: ADMIN_FULLNAME, isActive: true, passwordHash: hash, lastLoginAt: null }));
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
        const cfgRepo = ds.getRepository(EmpresaConfig_1.EmpresaConfig);
        const cfg = await cfgRepo.findOne({ where: { id: 1 } });
        if (!cfg)
            await cfgRepo.save(cfgRepo.create({ id: 1, nombre: "Mi Empresa" }));
    }
    parseUrl(url) {
        const m = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:/?]+):(\d+)/);
        if (!m)
            throw new Error("Invalid DATABASE_ADMIN_URL format");
        return { username: m[1], password: m[2], host: m[3], port: Number(m[4]) };
    }
};
exports.DbResetService = DbResetService;
exports.DbResetService = DbResetService = DbResetService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DbResetService);
//# sourceMappingURL=db-reset.service.js.map