import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { AuditLog } from "./audit-log.entity";
export interface AuditEntry {
    tenantSlug: string;
    userId?: number | null;
    userEmail?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    action: string;
    module: string;
    entity?: string | null;
    entityId?: number | null;
    result?: "success" | "failure";
    metadata?: Record<string, any> | null;
}
export declare class AuditService {
    private readonly prisma;
    private readonly tds;
    private readonly logger;
    constructor(prisma: PrismaService, tds: TenantDataSourceService);
    list(tenantSlug: string, opts?: {
        page?: number;
        limit?: number;
        action?: string;
    }): Promise<{
        items: AuditLog[];
        total: number;
    }>;
    log(entry: AuditEntry): Promise<void>;
}
