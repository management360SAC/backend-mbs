import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

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
    await this.$connect();
    this.logger.log("Conectado a base de datos master");
    this.seedInitialTenant().catch((err: any) =>
      this.logger.error("Seed error:", err?.message),
    );
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async seedInitialTenant() {
    const count = await this.tenant.count();
    if (count > 0) return;

    const host = process.env.DB_HOST ?? "db";
    const port = parseInt(process.env.DB_PORT ?? "3306", 10);
    const user = process.env.DB_USER ?? "crm";
    const pass = process.env.DB_PASS ?? "crm";
    const name = process.env.DB_NAME ?? "default";

    await this.tenant.create({
      data: {
        name: "Management 360",
        slug: "management360",
        dbName: name,
        dbHost: host,
        dbPort: port,
        dbUser: user,
        dbPass: pass,
        isActive: true,
      },
    });
    this.logger.log("Tenant inicial 'Management 360' creado");
  }
}
