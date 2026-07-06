import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { CreateUserDto } from "../users/dto/users.dto";
import { UpdateEmpresaConfigDto } from "../empresa-config/dto/update-empresa-config.dto";
export declare class TenantProvisioningService {
    private readonly prisma;
    private readonly tds;
    private readonly logger;
    constructor(prisma: PrismaService, tds: TenantDataSourceService);
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
    private copyRolesFromParent;
    syncRolesToChildren(parentSlug: string): Promise<{
        synced: number;
        message: string;
    }>;
    private seedTenantData;
    private parseUrl;
    private resolveTenantInfo;
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
    getTenantConfig(slug: string): Promise<EmpresaConfig>;
    getAllTenantsLeads(params: {
        tenantSlug: string;
        q?: string;
        status?: string;
        sourceId?: number;
        page: number;
        limit: number;
    }): Promise<{
        items: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateTenantConfig(slug: string, dto: UpdateEmpresaConfigDto): Promise<EmpresaConfig>;
}
