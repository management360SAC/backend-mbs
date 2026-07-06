import { OnModuleDestroy } from "@nestjs/common";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { TenantInfo } from "./tenant.context";
export declare class TenantDataSourceService implements OnModuleDestroy {
    private readonly logger;
    private readonly pool;
    getDataSource(tenant?: TenantInfo): Promise<DataSource>;
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>, tenant?: TenantInfo): Promise<Repository<T>>;
    onModuleDestroy(): Promise<void>;
}
