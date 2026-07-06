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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const promise_1 = __importDefault(require("mysql2/promise"));
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const tenant_entities_1 = require("../tenant/tenant-entities");
const user_entity_1 = require("../users/user.entity");
const role_entity_1 = require("../roles/role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
const user_role_entity_1 = require("../users/user-role.entity");
const LeadStages_1 = require("../marketing/lead-stages/LeadStages");
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
function parseMasterUrl() {
    const raw = (process.env.DATABASE_MASTER_URL ?? "").replace(/^["']|["']$/g, "");
    const m = raw.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]+)/);
    if (!m)
        throw new Error(`DATABASE_MASTER_URL inválida o no configurada: "${raw}"`);
    const [, user, password, host, rawPort, database] = m;
    return { host, port: rawPort ? parseInt(rawPort, 10) : 3306, user, password, database };
}
function createAdapter() {
    return new adapter_mariadb_1.PrismaMariaDb(parseMasterUrl());
}
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    logger = new common_1.Logger(PrismaService_1.name);
    constructor() {
        super({ adapter: createAdapter() });
    }
    async onModuleInit() {
        await this.bootstrapTenantsTable();
        await this.$connect();
        this.logger.log("Conectado a base de datos master");
        this.seedInitialTenant().catch((err) => this.logger.error("Seed error:", err?.message));
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async bootstrapTenantsTable() {
        const { host, port, user, password, database } = parseMasterUrl();
        let conn;
        try {
            conn = await promise_1.default.createConnection({ host, port, user, password, database });
            await conn.execute(`
        CREATE TABLE IF NOT EXISTS \`tenants\` (
          \`id\`         INT          NOT NULL AUTO_INCREMENT,
          \`name\`       VARCHAR(200) NOT NULL,
          \`slug\`       VARCHAR(100) NOT NULL,
          \`db_name\`    VARCHAR(100) NOT NULL,
          \`db_host\`    VARCHAR(255) NOT NULL DEFAULT 'db',
          \`db_port\`    INT          NOT NULL DEFAULT 3306,
          \`db_user\`    VARCHAR(100) NOT NULL DEFAULT 'crm',
          \`db_pass\`    VARCHAR(255) NOT NULL DEFAULT 'crm',
          \`is_active\`  TINYINT(1)   NOT NULL DEFAULT 1,
          \`parent_id\`  INT          NULL,
          \`created_at\` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated_at\` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                          ON UPDATE CURRENT_TIMESTAMP(3),
          UNIQUE INDEX \`tenants_slug_key\` (\`slug\`),
          PRIMARY KEY (\`id\`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
            this.logger.log(`Tabla tenants lista en ${database}`);
        }
        catch (err) {
            this.logger.error(`Bootstrap tenants table: ${err?.message}`);
        }
        finally {
            await conn?.end().catch(() => { });
        }
    }
    async seedInitialTenant() {
        const { host, port, user, password, database } = parseMasterUrl();
        const dbHost = process.env.DB_HOST ?? host;
        const dbPort = parseInt(process.env.DB_PORT ?? String(port), 10);
        const dbUser = process.env.DB_USER ?? user;
        const dbPass = process.env.DB_PASS ?? password;
        const dbName = process.env.DB_NAME ?? database;
        const count = await this.tenant.count();
        if (count === 0) {
            await this.tenant.create({
                data: {
                    name: "Management 360",
                    slug: "management360",
                    dbName,
                    dbHost,
                    dbPort,
                    dbUser,
                    dbPass,
                    isActive: true,
                },
            });
            this.logger.log("Tenant inicial 'Management 360' creado");
        }
        const allTenants = await this.tenant.findMany({ where: { isActive: true } });
        for (const t of allTenants) {
            await this.setupTenantDatabase(t.dbHost, t.dbPort, t.dbUser, t.dbPass, t.dbName);
        }
    }
    parseAdminUrl() {
        const raw = (process.env.DATABASE_ADMIN_URL ?? "").replace(/^["']|["']$/g, "");
        const m = raw.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]+)/);
        if (!m)
            return null;
        const [, user, password, host, rawPort] = m;
        return { user, password, host, port: rawPort ? parseInt(rawPort, 10) : 3306 };
    }
    async patchTenantSchema(database) {
        const admin = this.parseAdminUrl();
        if (!admin) {
            this.logger.warn("DATABASE_ADMIN_URL no configurada, saltando patch de schema");
            return;
        }
        let conn;
        try {
            conn = await promise_1.default.createConnection({ host: admin.host, port: admin.port, user: admin.user, password: admin.password, database });
            const columns = [
                ["fb_verify_token", "VARCHAR(200)"],
                ["fb_page_access_token", "TEXT"],
                ["fb_page_id", "VARCHAR(50)"],
                ["web_form_api_key", "VARCHAR(64)"],
            ];
            for (const [col, type] of columns) {
                const [rows] = await conn.execute(`SELECT COUNT(*) AS cnt FROM INFORMATION_SCHEMA.COLUMNS
           WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'empresa_config' AND COLUMN_NAME = ?`, [database, col]);
                if ((rows[0]?.cnt ?? 0) === 0) {
                    await conn.execute(`ALTER TABLE \`empresa_config\` ADD COLUMN \`${col}\` ${type} NULL`);
                    this.logger.log(`Columna ${col} agregada a empresa_config en ${database}`);
                }
            }
        }
        catch (err) {
            this.logger.error(`Patch tenant schema: ${err?.message}`);
        }
        finally {
            await conn?.end().catch(() => { });
        }
    }
    async setupTenantDatabase(host, port, user, password, database) {
        const admin = this.parseAdminUrl();
        const ds = new typeorm_1.DataSource({
            type: "mysql",
            host: admin?.host ?? host,
            port: admin?.port ?? port,
            username: admin?.user ?? user,
            password: admin?.password ?? password,
            database,
            entities: tenant_entities_1.TENANT_ENTITIES,
            synchronize: true,
        });
        try {
            await ds.initialize();
            this.logger.log(`Schema sincronizado para ${database}`);
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
                adminRole = await roleRepo.save(roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo", isSystem: true }));
            }
            const rpRepo = ds.getRepository(role_permission_entity_1.RolePermission);
            for (const perm of savedPerms) {
                const exists = await rpRepo.findOne({ where: { roleId: adminRole.id, permissionId: perm.id } });
                if (!exists)
                    await rpRepo.save(rpRepo.create({ roleId: adminRole.id, permissionId: perm.id }));
            }
            const stageRepo = ds.getRepository(LeadStages_1.LeadStage);
            for (const s of DEFAULT_LEAD_STAGES) {
                const exists = await stageRepo.findOne({ where: { name: s.name } });
                if (!exists)
                    await stageRepo.save(stageRepo.create(s));
            }
            const userRepo = ds.getRepository(user_entity_1.User);
            let adminUser = await userRepo.findOne({ where: { email: "admin@crm.local" } });
            if (!adminUser) {
                const hash = await bcrypt.hash("admin123", 10);
                adminUser = await userRepo.save(userRepo.create({ email: "admin@crm.local", fullName: "Admin", isActive: true, passwordHash: hash, lastLoginAt: null }));
                this.logger.log("Usuario admin creado: admin@crm.local / admin123");
            }
            const urRepo = ds.getRepository(user_role_entity_1.UserRole);
            const urExists = await urRepo.findOne({ where: { userId: adminUser.id, roleId: adminRole.id } });
            if (!urExists)
                await urRepo.save(urRepo.create({ userId: adminUser.id, roleId: adminRole.id }));
        }
        catch (err) {
            this.logger.error(`Setup tenant database: ${err?.message}`);
        }
        finally {
            await ds.destroy().catch(() => { });
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map