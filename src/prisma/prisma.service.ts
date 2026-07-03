import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const MASTER_DB = "crm_master";

function createAdapter() {
  return new PrismaMariaDb({
    host:     process.env.DB_HOST     ?? "db",
    port:     parseInt(process.env.DB_PORT ?? "3306", 10),
    user:     process.env.DB_USER     ?? "crm",
    password: process.env.DB_PASS     ?? "crm",
    database: MASTER_DB,
  });
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
    await this.bootstrapMasterDb();
    await this.$connect();
    this.logger.log("Conectado a crm_master");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async bootstrapMasterDb() {
    const host     = process.env.DB_HOST ?? "db";
    const port     = parseInt(process.env.DB_PORT ?? "3306", 10);
    const user     = process.env.DB_USER ?? "crm";
    const password = process.env.DB_PASS ?? "crm";

    // Intentar crear la BD y tabla usando el usuario crm directamente
    let conn: mariadb.Connection | undefined;
    try {
      conn = await mariadb.createConnection({ host, port, user, password });

      await conn.query(
        `CREATE DATABASE IF NOT EXISTS \`${MASTER_DB}\`
         CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
      );

      await conn.query(`
        CREATE TABLE IF NOT EXISTS \`${MASTER_DB}\`.\`tenants\` (
          \`id\`        INT          NOT NULL AUTO_INCREMENT,
          \`name\`      VARCHAR(200) NOT NULL,
          \`slug\`      VARCHAR(100) NOT NULL,
          \`db_name\`   VARCHAR(100) NOT NULL,
          \`db_host\`   VARCHAR(255) NOT NULL DEFAULT 'db',
          \`db_port\`   INT          NOT NULL DEFAULT 3306,
          \`db_user\`   VARCHAR(100) NOT NULL DEFAULT 'crm',
          \`db_pass\`   VARCHAR(255) NOT NULL DEFAULT 'crm',
          \`is_active\` TINYINT(1)   NOT NULL DEFAULT 1,
          \`parent_id\` INT          NULL,
          \`created_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                         ON UPDATE CURRENT_TIMESTAMP(3),
          UNIQUE INDEX \`tenants_slug_key\` (\`slug\`),
          PRIMARY KEY (\`id\`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);

      this.logger.log("crm_master y tabla tenants verificadas/creadas");
    } catch (err: any) {
      // El usuario crm puede no tener CREATE DATABASE — intentar con admin
      this.logger.warn(`Bootstrap con crm falló (${err?.message}), intentando con admin...`);
      await conn?.end().catch(() => {});
      conn = undefined;
      await this.bootstrapWithAdmin();
    } finally {
      await conn?.end().catch(() => {});
    }
  }

  private async bootstrapWithAdmin() {
    const adminUrl = (process.env.DATABASE_ADMIN_URL ?? "").replace(/^["']|["']$/g, "");
    const m = adminUrl.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]*)/);
    if (!m) {
      this.logger.warn("DATABASE_ADMIN_URL no configurada; crm_master debe existir manualmente");
      return;
    }
    const [, user, password, host, rawPort] = m;
    const port = rawPort ? parseInt(rawPort, 10) : 3306;

    let conn: mariadb.Connection | undefined;
    try {
      conn = await mariadb.createConnection({ host, port, user, password });

      await conn.query(
        `CREATE DATABASE IF NOT EXISTS \`${MASTER_DB}\`
         CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
      );
      await conn.query(
        `GRANT ALL PRIVILEGES ON \`${MASTER_DB}\`.* TO '${process.env.DB_USER ?? "crm"}'@'%'`,
      );
      await conn.query(`FLUSH PRIVILEGES`);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS \`${MASTER_DB}\`.\`tenants\` (
          \`id\`        INT          NOT NULL AUTO_INCREMENT,
          \`name\`      VARCHAR(200) NOT NULL,
          \`slug\`      VARCHAR(100) NOT NULL,
          \`db_name\`   VARCHAR(100) NOT NULL,
          \`db_host\`   VARCHAR(255) NOT NULL DEFAULT 'db',
          \`db_port\`   INT          NOT NULL DEFAULT 3306,
          \`db_user\`   VARCHAR(100) NOT NULL DEFAULT 'crm',
          \`db_pass\`   VARCHAR(255) NOT NULL DEFAULT 'crm',
          \`is_active\` TINYINT(1)   NOT NULL DEFAULT 1,
          \`parent_id\` INT          NULL,
          \`created_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                         ON UPDATE CURRENT_TIMESTAMP(3),
          UNIQUE INDEX \`tenants_slug_key\` (\`slug\`),
          PRIMARY KEY (\`id\`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);

      this.logger.log("crm_master creada/verificada con credenciales admin");
    } catch (err: any) {
      this.logger.error("No se pudo inicializar crm_master:", err?.message);
    } finally {
      await conn?.end().catch(() => {});
    }
  }
}
