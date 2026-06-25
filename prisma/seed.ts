import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const adapter = new PrismaMariaDb(process.env.DATABASE_MASTER_URL as string);
const prisma = new PrismaClient({ adapter });

const TENANTS = [
  {
    name: "MBS Original",
    slug: "mbs",
    dbName: "crm_mbs",
    dbHost: process.env.DB_HOST ?? "db",
    dbPort: parseInt(process.env.DB_PORT ?? "3306"),
    dbUser: process.env.DB_USER ?? "crm",
    dbPass: process.env.DB_PASS ?? "crm",
    isActive: true,
  },
  {
    name: "Empresa Demo A",
    slug: "empresa-a",
    dbName: "crm_tenant_empresa_a",
    dbHost: process.env.DB_HOST ?? "db",
    dbPort: parseInt(process.env.DB_PORT ?? "3306"),
    dbUser: process.env.DB_USER ?? "crm",
    dbPass: process.env.DB_PASS ?? "crm",
    isActive: true,
  },
  {
    name: "Empresa Demo B",
    slug: "empresa-b",
    dbName: "crm_tenant_empresa_b",
    dbHost: process.env.DB_HOST ?? "db",
    dbPort: parseInt(process.env.DB_PORT ?? "3306"),
    dbUser: process.env.DB_USER ?? "crm",
    dbPass: process.env.DB_PASS ?? "crm",
    isActive: false,
  },
];

async function main() {
  for (const tenant of TENANTS) {
    await prisma.tenant.upsert({
      where: { slug: tenant.slug },
      update: tenant,
      create: tenant,
    });
    console.log(`[seed] tenant: ${tenant.slug} (${tenant.name})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
