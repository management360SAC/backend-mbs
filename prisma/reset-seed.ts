/**
 * RESET & SEED
 * Drops all tenant databases, clears tenants table, then provisions:
 *   1. Management 360 (parent)
 *   2. MBS (child of Management 360)
 * Both with admin user toledo@zentra.com / admin12345@
 *
 * Run inside the backend container:
 *   npm run db:reset
 */

import "dotenv/config";
import { DataSource, In } from "typeorm";
import * as bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { TENANT_ENTITIES } from "../src/tenant/tenant-entities";
import { User } from "../src/users/user.entity";
import { UserRole } from "../src/users/user-role.entity";
import { Role } from "../src/roles/role.entity";
import { RolePermission } from "../src/roles/role-permission.entity";
import { Permission } from "../src/permissions/permission.entity";
import { LeadStage } from "../src/marketing/lead-stages/LeadStages";
import { EmpresaConfig } from "../src/empresa-config/EmpresaConfig";

// ─── Config ──────────────────────────────────────────────────────────────────

const ADMIN_EMAIL = "toledo@zentra.com";
const ADMIN_PASSWORD = "admin12345@";
const ADMIN_FULL_NAME = "Daniel Toledo";

const TENANTS = [
  {
    name: "Management 360",
    slug: "management360",
    parentSlug: null as string | null,
  },
  {
    name: "MBS",
    slug: "mbs",
    parentSlug: "management360",
  },
];

// ─── Permissions seeded into every tenant ────────────────────────────────────

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
  { name: "Nuevo",              order: 1, isActive: true, isFinal: false },
  { name: "Contactado",         order: 2, isActive: true, isFinal: false },
  { name: "Calificado",         order: 3, isActive: true, isFinal: false },
  { name: "Propuesta enviada",  order: 4, isActive: true, isFinal: false },
  { name: "Negociacion",        order: 5, isActive: true, isFinal: false },
  { name: "Ganado",             order: 6, isActive: true, isFinal: true  },
  { name: "Perdido",            order: 7, isActive: true, isFinal: true  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseAdminUrl(url: string) {
  const m = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:/?]+):(\d+)/);
  if (!m) throw new Error("Invalid DATABASE_ADMIN_URL format");
  return { username: m[1], password: m[2], host: m[3], port: Number(m[4]) };
}

async function seedTenantDb(ds: DataSource) {
  // 1. Permissions
  const permRepo = ds.getRepository(Permission);
  const savedPerms: Permission[] = [];
  for (const p of DEFAULT_PERMISSIONS) {
    let perm = await permRepo.findOne({ where: { code: p.code } });
    if (!perm) perm = await permRepo.save(permRepo.create(p));
    savedPerms.push(perm);
  }

  // 2. Roles
  const roleRepo = ds.getRepository(Role);
  const rpRepo   = ds.getRepository(RolePermission);

  let adminRole = await roleRepo.findOne({ where: { code: "ADMIN" } });
  if (!adminRole) {
    adminRole = await roleRepo.save(
      roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo al sistema", isSystem: true }),
    );
  }
  for (const perm of savedPerms) {
    const exists = await rpRepo.findOne({ where: { roleId: adminRole.id, permissionId: perm.id } });
    if (!exists) await rpRepo.save(rpRepo.create({ roleId: adminRole.id, permissionId: perm.id }));
  }

  let vendedorRole = await roleRepo.findOne({ where: { code: "VENDEDOR" } });
  if (!vendedorRole) {
    vendedorRole = await roleRepo.save(
      roleRepo.create({ code: "VENDEDOR", name: "Vendedor", description: "Acceso a ventas y marketing", isSystem: false }),
    );
  }
  const vendedorPerms = savedPerms.filter((p) =>
    ["funnel.read", "funnel.manage", "marketing.read", "marketing.manage"].includes(p.code),
  );
  for (const perm of vendedorPerms) {
    const exists = await rpRepo.findOne({ where: { roleId: vendedorRole.id, permissionId: perm.id } });
    if (!exists) await rpRepo.save(rpRepo.create({ roleId: vendedorRole.id, permissionId: perm.id }));
  }

  // 3. Admin user
  const userRepo = ds.getRepository(User);
  let adminUser = await userRepo.findOne({ where: { email: ADMIN_EMAIL } } as any);
  if (!adminUser) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, await bcrypt.genSalt(10));
    adminUser = await userRepo.save(
      userRepo.create({ email: ADMIN_EMAIL, fullName: ADMIN_FULL_NAME, isActive: true, passwordHash: hash, lastLoginAt: null }),
    );
  }

  const urRepo = ds.getRepository(UserRole);
  const urExists = await urRepo.findOne({ where: { userId: adminUser.id, roleId: adminRole.id } } as any);
  if (!urExists) await urRepo.save(urRepo.create({ userId: adminUser.id, roleId: adminRole.id }));

  // 4. Lead stages
  const stageRepo = ds.getRepository(LeadStage);
  for (const s of DEFAULT_LEAD_STAGES) {
    const exists = await stageRepo.findOne({ where: { name: s.name } });
    if (!exists) await stageRepo.save(stageRepo.create(s));
  }

  // 5. EmpresaConfig placeholder
  const configRepo = ds.getRepository(EmpresaConfig);
  const cfg = await configRepo.findOne({ where: { id: 1 } });
  if (!cfg) await configRepo.save(configRepo.create({ id: 1, nombre: "Mi Empresa" }));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const adminUrl  = process.env.DATABASE_ADMIN_URL!;
  const masterUrl = process.env.DATABASE_URL!;

  if (!adminUrl) throw new Error("DATABASE_ADMIN_URL not set");

  const { host, port, username, password } = parseAdminUrl(adminUrl);

  // ── Root connection (to create/drop DBs) ─────────────────────────────────
  const rootDs = new DataSource({ type: "mysql", host, port, username, password, database: "mysql", synchronize: false });
  await rootDs.initialize();
  console.log("✔ Connected as root");

  // ── Detect and drop all crm_tenant_* databases ───────────────────────────
  const [dbs]: [any[], any] = await rootDs.query("SHOW DATABASES LIKE 'crm_tenant_%'");
  const tenantDbs: string[] = dbs.map((r: any) => Object.values(r)[0] as string);

  if (tenantDbs.length > 0) {
    console.log(`Dropping ${tenantDbs.length} tenant database(s): ${tenantDbs.join(", ")}`);
    for (const db of tenantDbs) {
      await rootDs.query(`DROP DATABASE IF EXISTS \`${db}\``);
      console.log(`  ✔ Dropped: ${db}`);
    }
  } else {
    console.log("No tenant databases found to drop.");
  }

  await rootDs.destroy();

  // ── Clear tenants table in master DB ─────────────────────────────────────
  const rawUrl = masterUrl.replace(/^mysql:\/\//, "mariadb://");
  const adapter = new PrismaMariaDb(rawUrl);
  const prisma  = new PrismaClient({ adapter });

  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");
  await prisma.$executeRawUnsafe("DELETE FROM tenants");
  await prisma.$executeRawUnsafe("ALTER TABLE tenants AUTO_INCREMENT = 1");
  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");
  console.log("✔ Tenants table cleared");

  // ── Provision each tenant ──────────────────────────────────────────────────
  const { host: h, port: p, username: u, password: pw } = parseAdminUrl(adminUrl);
  const tenantMap: Record<string, number> = {};

  for (const t of TENANTS) {
    const slug   = t.slug;
    const dbName = `crm_tenant_${slug.replace(/-/g, "_")}`;

    // Create the database
    const adminDs = new DataSource({ type: "mysql", host: h, port: p, username: u, password: pw, database: "mysql", synchronize: false });
    await adminDs.initialize();
    await adminDs.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    const dbUser = process.env.DB_USER ?? "crm";
    await adminDs.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'%'`);
    await adminDs.query("FLUSH PRIVILEGES");
    await adminDs.destroy();
    console.log(`  ✔ Database created: ${dbName}`);

    // Sync schema + seed
    const ds = new DataSource({
      type: "mysql",
      host: h,
      port: p,
      username: process.env.DB_USER ?? "crm",
      password: process.env.DB_PASS,
      database: dbName,
      entities: TENANT_ENTITIES,
      synchronize: true,
    });
    await ds.initialize();
    console.log(`  ✔ Schema synchronized: ${dbName}`);

    await seedTenantDb(ds);
    await ds.destroy();
    console.log(`  ✔ Seeded: ${slug}`);

    // Register in master tenants table
    const parentId = t.parentSlug ? tenantMap[t.parentSlug] ?? null : null;
    const tenant = await prisma.tenant.create({
      data: {
        name: t.name,
        slug,
        dbName,
        dbHost: h,
        dbPort: p,
        dbUser: process.env.DB_USER ?? "crm",
        dbPass: process.env.DB_PASS,
        isActive: true,
        ...(parentId ? { parentId } : {}),
      },
    });
    tenantMap[slug] = tenant.id;
    console.log(`✔ Tenant registered: ${t.name} (id=${tenant.id}${parentId ? `, parent=${parentId}` : ""})`);
  }

  await prisma.$disconnect();

  console.log("\n✅ Reset complete!");
  console.log(`   Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  console.log("   Tenants: Management 360 (parent) → MBS (child)");
}

main().catch((e) => {
  console.error("❌ Reset failed:", e);
  process.exit(1);
});
