import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
function createAdapter() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL env var is not set");
  const url = raw.trim().replace(/^["']|["']$/g, "").replace(/^mysql:\/\//, "mariadb://");
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
