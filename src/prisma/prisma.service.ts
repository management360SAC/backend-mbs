import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
function createAdapter() {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT ?? "3306";
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const name = process.env.DB_NAME;
  if (!host || !user || !pass || !name) {
    throw new Error("Faltan variables de BD: DB_HOST, DB_USER, DB_PASS o DB_NAME");
  }
  const url = `mariadb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${name}`;
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
