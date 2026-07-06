import { TenantProvisioningService } from "./tenant-provisioning.service";
import { DbResetService } from "./db-reset.service";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { CreateUserDto } from "../users/dto/users.dto";
import { UpdateEmpresaConfigDto } from "../empresa-config/dto/update-empresa-config.dto";
import { AuditService } from "../audit/audit.service";
export declare class AdminController {
    private readonly service;
    private readonly audit;
    private readonly dbReset;
    constructor(service: TenantProvisioningService, audit: AuditService, dbReset: DbResetService);
    listTenantsPublic(): Promise<{
        name: string;
        slug: string;
    }[]>;
    listTenants(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        dbName: string;
        dbHost: string;
        dbPort: number;
    }[]>;
    provision(dto: CreateTenantDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        dbName: string;
        dbHost: string;
        dbPort: number;
        dbUser: string;
        dbPass: string;
        parentId: number | null;
    }>;
    listTenantUsers(slug: string): Promise<{
        id: number;
        email: string;
        full_name: string;
        is_active: boolean;
        last_login_at: Date | null;
        created_at: Date;
        roles: {
            id: number;
            code: string;
            name: string;
        }[];
    }[]>;
    createTenantUser(slug: string, dto: CreateUserDto): Promise<{
        id: number;
        email: string;
        full_name: string;
        is_active: boolean;
        last_login_at: Date | null;
        created_at: Date;
        roles: {
            id: number;
            code: string;
            name: string;
        }[];
    }>;
    getTenantConfig(slug: string): Promise<import("../empresa-config/EmpresaConfig").EmpresaConfig>;
    updateTenantConfig(slug: string, dto: UpdateEmpresaConfigDto): Promise<import("../empresa-config/EmpresaConfig").EmpresaConfig>;
    syncRolesToChildren(slug: string): Promise<{
        synced: number;
        message: string;
    }>;
    getAuditLogs(req: any, page?: string, limit?: string, action?: string): Promise<{
        items: import("../audit/audit-log.entity").AuditLog[];
        total: number;
    }>;
    getAllLeads(req: any, q?: string, status?: string, sourceId?: string, page?: string, limit?: string): Promise<{
        items: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    runDbReset(token: string): Promise<{
        ok: boolean;
        steps: string[];
    }>;
}
