import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DataSource } from "typeorm";

const MASTER_DB = "crm_master";

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
    await this.bootstrapMasterDb();
    await this.$connect();
    this.logger.log("Conectado a crm_master");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Garantiza que crm_master existe y que el usuario crm tiene acceso.
   * Usa TypeORM DataSource con credenciales admin (DATABASE_ADMIN_URL),
   * el mismo driver que usa el resto de la app.
   */
  private async bootstrapMasterDb() {
    const adminUrl = (process.env.DATABASE_ADMIN_URL ?? "").replace(/^["']|["']$/g, "");
    const m = adminUrl.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]*)/);

    if (!m) {
      this.logger.warn("DATABASE_ADMIN_URL no configurada — asegúrate que crm_master existe y crm tiene acceso");
      return;
    }

    const [, username, password, host, rawPort] = m;
    const port = rawPort ? parseInt(rawPort, 10) : 3306;
    const crmUser = process.env.DB_USER ?? "crm";

    const ds = new DataSource({
      type: "mysql",
      host,
      port,
      username,
      password,
      database: "mysql",
      synchronize: false,
    });

    try {
      await ds.initialize();
      this.logger.log("Bootstrap: conexión admin establecida");

      // Crear BD si no existe y garantizar acceso al usuario crm
      await ds.query(
        `CREATE DATABASE IF NOT EXISTS \`${MASTER_DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
      );
      await ds.query(
        `GRANT ALL PRIVILEGES ON \`${MASTER_DB}\`.* TO '${crmUser}'@'%'`,
      );
      await ds.query(`FLUSH PRIVILEGES`);

      // Crear tabla tenants si no existe
      await ds.query(`
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

      // Agregar columna parent_id si no existe
      await ds.query(`
        ALTER TABLE \`${MASTER_DB}\`.\`tenants\`
        ADD COLUMN IF NOT EXISTS \`parent_id\` INT NULL
      `).catch(() => {/* columna ya existe */});

      this.logger.log("crm_master: BD y tabla tenants verificadas/creadas correctamente");
    } catch (err: any) {
      this.logger.error(`Bootstrap crm_master falló: ${err?.message}`);
    } finally {
      await ds.destroy().catch(() => {});
    }
  }
}
