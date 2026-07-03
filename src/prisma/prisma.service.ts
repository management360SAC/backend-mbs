import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mysql from "mysql2/promise";
import { DataSource } from "typeorm";
import * as bcrypt from "bcryptjs";
import { TENANT_ENTITIES } from "../tenant/tenant-entities";
import { User } from "../users/user.entity";
import { Role } from "../roles/role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { UserRole } from "../users/user-role.entity";
import { LeadStage } from "../marketing/lead-stages/LeadStages";

const DEFAULT_PERMISSIONS = [
  { code: "users.create",       module: "users",       action: "create",  description: "Crear usuarios" },
  { code: "users.read",         module: "users",       action: "read",    description: "Ver usuarios" },
  { code: "users.update",       module: "users",       action: "update",  description: "Editar usuarios" },
  { code: "users.delete",       module: "users",       action: "delete",  description: "Eliminar usuarios" },
  { code: "roles.create",       module: "roles",       action: "create",  description: "Crear roles" },
  { code: "roles.read",         module: "roles",       action: "read",    description: "Ver roles" },
  { code: "roles.update",       module: "roles",       action: "update",  description: "Editar roles" },
  { code: "roles.delete",       module: "roles",       action: "delete",  description: "Eliminar roles" },
  { code: "permissions.read",   module: "permissions", action: "read",    description: "Ver permisos" },
  { code: "permissions.assign", module: "permissions", action: "assign",  description: "Asignar permisos" },
  { code: "funnel.read",        module: "funnel",      action: "read",    description: "Ver embudo" },
  { code: "funnel.manage",      module: "funnel",      action: "manage",  description: "Gestionar embudo" },
  { code: "marketing.read",     module: "marketing",   action: "read",    description: "Ver marketing" },
  { code: "marketing.manage",   module: "marketing",   action: "manage",  description: "Gestionar marketing" },
];

const DEFAULT_LEAD_STAGES = [
  { name: "Nuevo",             order: 1, isActive: true, isFinal: false },
  { name: "Contactado",        order: 2, isActive: true, isFinal: false },
  { name: "Calificado",        order: 3, isActive: true, isFinal: false },
  { name: "Propuesta enviada", order: 4, isActive: true, isFinal: false },
  { name: "Negociacion",       order: 5, isActive: true, isFinal: false },
  { name: "Ganado",            order: 6, isActive: true, isFinal: true  },
  { name: "Perdido",           order: 7, isActive: true, isFinal: true  },
];

function parseMasterUrl() {
  const raw = (process.env.DATABASE_MASTER_URL ?? "").replace(/^["']|["']$/g, "");
  const m = raw.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]+)/);
  if (!m) throw new Error(`DATABASE_MASTER_URL inválida o no configurada: "${raw}"`);
  const [, user, password, host, rawPort, database] = m;
  return { host, port: rawPort ? parseInt(rawPort, 10) : 3306, user, password, database };
}

function createAdapter() {
  return new PrismaMariaDb(parseMasterUrl());
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({ adapter: createAdapter() });
  }

  async onModuleInit() {
    await this.bootstrapTenantsTable();
    await this.$connect();
    this.logger.log("Conectado a base de datos master");
    this.seedInitialTenant().catch((err: any) =>
      this.logger.error("Seed error:", err?.message),
    );
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async bootstrapTenantsTable() {
    const { host, port, user, password, database } = parseMasterUrl();
    let conn: mysql.Connection | undefined;
    try {
      conn = await mysql.createConnection({ host, port, user, password, database });
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
    } catch (err: any) {
      this.logger.error(`Bootstrap tenants table: ${err?.message}`);
    } finally {
      await conn?.end().catch(() => {});
    }
  }

  private async seedInitialTenant() {
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

    // Siempre verificar que el schema y usuario admin existan
    await this.setupTenantDatabase(dbHost, dbPort, dbUser, dbPass, dbName);
  }

  private parseAdminUrl() {
    const raw = (process.env.DATABASE_ADMIN_URL ?? "").replace(/^["']|["']$/g, "");
    const m = raw.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]+)/);
    if (!m) return null;
    const [, user, password, host, rawPort] = m;
    return { user, password, host, port: rawPort ? parseInt(rawPort, 10) : 3306 };
  }

  private async patchTenantSchema(database: string) {
    const admin = this.parseAdminUrl();
    if (!admin) {
      this.logger.warn("DATABASE_ADMIN_URL no configurada, saltando patch de schema");
      return;
    }
    let conn: mysql.Connection | undefined;
    try {
      conn = await mysql.createConnection({ host: admin.host, port: admin.port, user: admin.user, password: admin.password, database });
      const columns: [string, string][] = [
        ["fb_verify_token",      "VARCHAR(200)"],
        ["fb_page_access_token", "TEXT"],
        ["fb_page_id",           "VARCHAR(50)"],
        ["web_form_api_key",     "VARCHAR(64)"],
      ];
      for (const [col, type] of columns) {
        const [rows] = await conn.execute<mysql.RowDataPacket[]>(
          `SELECT COUNT(*) AS cnt FROM INFORMATION_SCHEMA.COLUMNS
           WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'empresa_config' AND COLUMN_NAME = ?`,
          [database, col],
        );
        if ((rows[0]?.cnt ?? 0) === 0) {
          await conn.execute(`ALTER TABLE \`empresa_config\` ADD COLUMN \`${col}\` ${type} NULL`);
          this.logger.log(`Columna ${col} agregada a empresa_config en ${database}`);
        }
      }
    } catch (err: any) {
      this.logger.error(`Patch tenant schema: ${err?.message}`);
    } finally {
      await conn?.end().catch(() => {});
    }
  }

  private async setupTenantDatabase(
    host: string, port: number, user: string, password: string, database: string,
  ) {
    // Usar root para synchronize:true — mbscrm no tiene permisos ALTER TABLE
    const admin = this.parseAdminUrl();
    const ds = new DataSource({
      type: "mysql",
      host:     admin?.host ?? host,
      port:     admin?.port ?? port,
      username: admin?.user ?? user,
      password: admin?.password ?? password,
      database,
      entities: TENANT_ENTITIES,
      synchronize: true,
    });

    try {
      await ds.initialize();
      this.logger.log(`Schema sincronizado para ${database}`);

      // Permisos
      const permRepo = ds.getRepository(Permission);
      const savedPerms: Permission[] = [];
      for (const p of DEFAULT_PERMISSIONS) {
        let perm = await permRepo.findOne({ where: { code: p.code } });
        if (!perm) perm = await permRepo.save(permRepo.create(p));
        savedPerms.push(perm);
      }

      // Roles
      const roleRepo = ds.getRepository(Role);
      let adminRole = await roleRepo.findOne({ where: { code: "ADMIN" } });
      if (!adminRole) {
        adminRole = await roleRepo.save(
          roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo", isSystem: true }),
        );
      }
      const rpRepo = ds.getRepository(RolePermission);
      for (const perm of savedPerms) {
        const exists = await rpRepo.findOne({ where: { roleId: adminRole.id, permissionId: perm.id } });
        if (!exists) await rpRepo.save(rpRepo.create({ roleId: adminRole.id, permissionId: perm.id }));
      }

      // Etapas de lead
      const stageRepo = ds.getRepository(LeadStage);
      for (const s of DEFAULT_LEAD_STAGES) {
        const exists = await stageRepo.findOne({ where: { name: s.name } });
        if (!exists) await stageRepo.save(stageRepo.create(s));
      }

      // Usuario admin inicial
      const userRepo = ds.getRepository(User);
      let adminUser = await userRepo.findOne({ where: { email: "admin@crm.local" } as any });
      if (!adminUser) {
        const hash = await bcrypt.hash("admin123", 10);
        adminUser = await userRepo.save(
          userRepo.create({ email: "admin@crm.local", fullName: "Admin", isActive: true, passwordHash: hash, lastLoginAt: null }),
        );
        this.logger.log("Usuario admin creado: admin@crm.local / admin123");
      }

      const urRepo = ds.getRepository(UserRole);
      const urExists = await urRepo.findOne({ where: { userId: adminUser.id, roleId: adminRole.id } as any });
      if (!urExists) await urRepo.save(urRepo.create({ userId: adminUser.id, roleId: adminRole.id }));

    } catch (err: any) {
      this.logger.error(`Setup tenant database: ${err?.message}`);
    } finally {
      await ds.destroy().catch(() => {});
    }
  }
}
