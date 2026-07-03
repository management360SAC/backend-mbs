import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
function createAdapter() {
  // Preferir DATABASE_MASTER_URL; caer en DATABASE_URL como fallback
  const masterUrl = (
    process.env.DATABASE_MASTER_URL ?? process.env.DATABASE_URL ?? ""
  ).trim().replace(/^["']|["']$/g, "");

  // Intentar parsear la URL completa: mysql://user:pass@host:port/dbname
  const fromUrl = masterUrl.match(/^(?:mysql|mariadb):\/\/([^:]+):([^@]*)@([^:/]+):?(\d*)\/([^?#]+)/);
  if (fromUrl) {
    const [, user, pass, host, port, dbName] = fromUrl;
    const url = `mariadb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port || "3306"}/${dbName}`;
    return new PrismaMariaDb(url);
  }

  // Fallback: construir desde variables individuales + nombre de BD extraído
  const host   = process.env.DB_HOST;
  const port   = process.env.DB_PORT ?? "3306";
  const user   = process.env.DB_USER;
  const pass   = process.env.DB_PASS;
  const dbName = masterUrl.match(/\/([^/?#]+)(?:[?#]|$)/)?.[1];
  if (!host || !user || !pass || !dbName) {
    throw new Error(`Faltan variables de BD master. host=${host} user=${user} pass=${!!pass} dbName=${dbName}`);
  }
  const url = `mariadb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${dbName}`;
  return new PrismaMariaDb(url);
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ adapter: createAdapter() });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
