import { Injectable, Logger } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { TENANT_ENTITIES } from "../tenant/tenant-entities";
import { User } from "../users/user.entity";
import { UserRole } from "../users/user-role.entity";
import { Role } from "../roles/role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";

const ADMIN_EMAIL    = "toledo@zentra.com";
const ADMIN_PASSWORD = "admin12345@";
const ADMIN_FULLNAME = "Daniel Toledo";

const TENANTS = [
  { name: "Management 360", slug: "management360", parentSlug: null as string | null },
  { name: "MBS",            slug: "mbs",           parentSlug: "management360" },
];

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

@Injectable()
export class DbResetService {
  private readonly logger = new Logger(DbResetService.name);

  constructor(private readonly prisma: PrismaService) {}

  async runReset(): Promise<{ ok: boolean; steps: string[] }> {
    const steps: string[] = [];
    const adminUrl = process.env.DATABASE_ADMIN_URL;
    if (!adminUrl) throw new Error("DATABASE_ADMIN_URL not set");

    const { host, port, username, password } = this.parseUrl(adminUrl);
    const dbUser = process.env.DB_USER ?? "crm";
    const dbPass = process.env.DB_PASS ?? "crm";

    // 1. Drop all crm_tenant_* databases
    const rootDs = new DataSource({ type: "mysql", host, port, username, password, database: "mysql", synchronize: false });
    await rootDs.initialize();

    const dbs: any[] = await rootDs.query("SHOW DATABASES LIKE 'crm_tenant_%'");
    const tenantDbs = dbs.map((r: any) => Object.values(r)[0] as string);

    for (const db of tenantDbs) {
      await rootDs.query(`DROP DATABASE IF EXISTS \`${db}\``);
      steps.push(`Dropped database: ${db}`);
      this.logger.log(`Dropped: ${db}`);
    }
    await rootDs.destroy();

    // 2. Clear tenants table
    await this.prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");
    await this.prisma.$executeRawUnsafe("DELETE FROM tenants");
    await this.prisma.$executeRawUnsafe("ALTER TABLE tenants AUTO_INCREMENT = 1");
    await this.prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");
    steps.push("Cleared tenants table");

    // 3. Provision each tenant
    const tenantMap: Record<string, number> = {};

    for (const t of TENANTS) {
      const slug   = t.slug;
      const dbName = `crm_tenant_${slug.replace(/-/g, "_")}`;

      // Create DB
      const adminDs = new DataSource({ type: "mysql", host, port, username, password, database: "mysql", synchronize: false });
      await adminDs.initialize();
      await adminDs.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await adminDs.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'%'`);
      await adminDs.query("FLUSH PRIVILEGES");
      await adminDs.destroy();
      steps.push(`Created database: ${dbName}`);

      // Sync schema
      const ds = new DataSource({ type: "mysql", host, port, username: dbUser, password: dbPass, database: dbName, entities: TENANT_ENTITIES, synchronize: true });
      await ds.initialize();
      steps.push(`Schema synchronized: ${dbName}`);

      // Seed
      await this.seedTenant(ds);
      await ds.destroy();
      steps.push(`Seeded tenant: ${slug} (user: ${ADMIN_EMAIL})`);

      // Register in master
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

  private async seedTenant(ds: DataSource) {
    // Permissions
    const permRepo = ds.getRepository(Permission);
    const savedPerms: Permission[] = [];
    for (const p of DEFAULT_PERMISSIONS) {
      let perm = await permRepo.findOne({ where: { code: p.code } });
      if (!perm) perm = await permRepo.save(permRepo.create(p));
      savedPerms.push(perm);
    }

    // ADMIN role
    const roleRepo = ds.getRepository(Role);
    const rpRepo   = ds.getRepository(RolePermission);
    let adminRole = await roleRepo.findOne({ where: { code: "ADMIN" } });
    if (!adminRole) {
      adminRole = await roleRepo.save(roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo al sistema", isSystem: true }));
    }
    for (const perm of savedPerms) {
      const exists = await rpRepo.findOne({ where: { roleId: adminRole.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: adminRole.id, permissionId: perm.id }));
    }

    // VENDEDOR role
    let vendedorRole = await roleRepo.findOne({ where: { code: "VENDEDOR" } });
    if (!vendedorRole) {
      vendedorRole = await roleRepo.save(roleRepo.create({ code: "VENDEDOR", name: "Vendedor", description: "Acceso a ventas y marketing", isSystem: false }));
    }
    const vendedorPerms = savedPerms.filter((p) => ["funnel.read", "funnel.manage", "marketing.read", "marketing.manage"].includes(p.code));
    for (const perm of vendedorPerms) {
      const exists = await rpRepo.findOne({ where: { roleId: vendedorRole.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: vendedorRole.id, permissionId: perm.id }));
    }

    // Admin user
    const userRepo = ds.getRepository(User);
    let adminUser = await userRepo.findOne({ where: { email: ADMIN_EMAIL } } as any);
    if (!adminUser) {
      const hash = await bcrypt.hash(ADMIN_PASSWORD, await bcrypt.genSalt(10));
      adminUser = await userRepo.save(userRepo.create({ email: ADMIN_EMAIL, fullName: ADMIN_FULLNAME, isActive: true, passwordHash: hash, lastLoginAt: null }));
    }

    const urRepo = ds.getRepository(UserRole);
    const urExists = await urRepo.findOne({ where: { userId: adminUser.id, roleId: adminRole.id } } as any);
    if (!urExists) await urRepo.save(urRepo.create({ userId: adminUser.id, roleId: adminRole.id }));

    // Lead stages
    const stageRepo = ds.getRepository(LeadStage);
    for (const s of DEFAULT_LEAD_STAGES) {
      const exists = await stageRepo.findOne({ where: { name: s.name } });
      if (!exists) await stageRepo.save(stageRepo.create(s));
    }

    // EmpresaConfig placeholder
    const cfgRepo = ds.getRepository(EmpresaConfig);
    const cfg = await cfgRepo.findOne({ where: { id: 1 } });
    if (!cfg) await cfgRepo.save(cfgRepo.create({ id: 1, nombre: "Mi Empresa" }));
  }

  private parseUrl(url: string) {
    const m = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:/?]+):(\d+)/);
    if (!m) throw new Error("Invalid DATABASE_ADMIN_URL format");
    return { username: m[1], password: m[2], host: m[3], port: Number(m[4]) };
  }
}
