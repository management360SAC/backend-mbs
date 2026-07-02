import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
function createAdapter() {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT ?? "3306";
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const rawDbUrl = (process.env.DATABASE_MASTER_URL ?? "").trim().replace(/^["']|["']$/g, "");
  const dbName = rawDbUrl.match(/\/([^/?#]+)(?:[?#]|$)/)?.[1];
  if (!host || !user || !pass || !dbName) {
    throw new Error(`Faltan variables de BD. host=${host} user=${user} pass=${!!pass} dbName=${dbName}`);
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
