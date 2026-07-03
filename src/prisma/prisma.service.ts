import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mysql from "mysql2/promise";

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
      this.logger.error(`Bootstrap falló: ${err?.message}`);
    } finally {
      await conn?.end().catch(() => {});
    }
  }

  private async seedInitialTenant() {
    const count = await this.tenant.count();
    if (count > 0) return;

    const { host, port, user: dbUser, password: dbPass, database } = parseMasterUrl();

    await this.tenant.create({
      data: {
        name: "Management 360",
        slug: "management360",
        dbName: process.env.DB_NAME ?? database,
        dbHost: process.env.DB_HOST ?? host,
        dbPort: parseInt(process.env.DB_PORT ?? String(port), 10),
        dbUser: process.env.DB_USER ?? dbUser,
        dbPass: process.env.DB_PASS ?? dbPass,
        isActive: true,
      },
    });
    this.logger.log("Tenant inicial 'Management 360' creado");
  }
}
