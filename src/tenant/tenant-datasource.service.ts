import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { TenantContext, TenantInfo } from "./tenant.context";
import { TENANT_ENTITIES } from "./tenant-entities";

@Injectable()
export class TenantDataSourceService implements OnModuleDestroy {
  private readonly logger = new Logger(TenantDataSourceService.name);
  private readonly pool = new Map<string, DataSource>();

  async getDataSource(tenant?: TenantInfo): Promise<DataSource> {
    const info = tenant ?? TenantContext.getOrFail();
    const key = info.slug;

    const existing = this.pool.get(key);
    if (existing) {
      if (!existing.isInitialized) await existing.initialize();
      return existing;
    }

    const ds = new DataSource({
      type: "mysql",
      host: info.dbHost,
      port: info.dbPort,
      username: info.dbUser,
      password: info.dbPass,
      database: info.dbName,
      entities: TENANT_ENTITIES,
      synchronize: true,
      poolSize: 5,
    });

    await ds.initialize();
    this.pool.set(key, ds);
    this.logger.log(`DataSource initialized for tenant: ${key} → ${info.dbName}`);
    return ds;
  }

  async getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    tenant?: TenantInfo,
  ): Promise<Repository<T>> {
    const ds = await this.getDataSource(tenant);
    return ds.getRepository(entity);
  }

  async onModuleDestroy() {
    for (const [key, ds] of this.pool.entries()) {
      if (ds.isInitialized) {
        await ds.destroy();
        this.logger.log(`DataSource destroyed: ${key}`);
      }
    }
    this.pool.clear();
  }
}
