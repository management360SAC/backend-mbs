import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private bootstrapTenantsTable;
    private seedInitialTenant;
    private parseAdminUrl;
    private patchTenantSchema;
    private setupTenantDatabase;
}
