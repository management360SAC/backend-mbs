export declare class AuditLog {
    id: number;
    tenantSlug: string;
    userId: number | null;
    userEmail: string | null;
    ip: string | null;
    userAgent: string | null;
    action: string;
    module: string;
    entity: string | null;
    entityId: number | null;
    result: string;
    metadata: Record<string, any> | null;
    createdAt: Date;
}
