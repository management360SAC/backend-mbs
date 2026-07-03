import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DataSource } from "typeorm";

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
    try {
      await this.bootstrapTenantsTable();
    } catch (err: any) {
      this.logger.error("Bootstrap error (continuando):", err?.message);
    }
    await this.$connect();
    this.logger.log("Conectado a base de datos master");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Garantiza que la tabla tenants existe y tiene al menos el tenant inicial.
   * Usa las credenciales de DATABASE_URL (mbscrm) — no necesita acceso root.
   */
  private async bootstrapTenantsTable() {
    const dbUrl = (process.env.DATABASE_URL ?? "").replace(/^["']|["']$/g, "");
    const m = dbUrl.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d+)?\/([^?#]+)/);

    if (!m) {
      this.logger.warn("DATABASE_URL no configurada — asegúrate que la tabla tenants existe");
      return;
    }

    const [, username, password, host, rawPort, database] = m;
    const port = rawPort ? parseInt(rawPort, 10) : 3306;

    const ds = new DataSource({
      type: "mysql",
      host,
      port,
      username,
      password,
      database,
      synchronize: false,
    });

    try {
      await ds.initialize();
      this.logger.log("Bootstrap: conexión establecida");

      await ds.query(`
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

      this.logger.log("Tabla tenants verificada/creada correctamente");

      const rows = await ds.query(`SELECT COUNT(*) AS cnt FROM \`tenants\``);
      if (Number(rows[0].cnt) === 0) {
        const dbHost = process.env.DB_HOST ?? host;
        const dbPort = parseInt(process.env.DB_PORT ?? String(port), 10);
        const dbUser = process.env.DB_USER ?? username;
        const dbPass = process.env.DB_PASS ?? password;
        const dbName = process.env.DB_NAME ?? database;
        await ds.query(`
          INSERT INTO \`tenants\`
            (name, slug, db_name, db_host, db_port, db_user, db_pass, is_active)
          VALUES
            ('Management 360', 'management360', '${dbName}', '${dbHost}', ${dbPort}, '${dbUser}', '${dbPass}', 1)
        `);
        this.logger.log("Tenant inicial 'Management 360' creado");
      }
    } catch (err: any) {
      this.logger.error(`Bootstrap falló: ${err?.message}`);
    } finally {
      await ds.destroy().catch(() => {});
    }
  }
}
