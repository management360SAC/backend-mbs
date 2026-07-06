import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { AuditService } from "../audit/audit.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    private readonly tds;
    private readonly audit;
    constructor(jwtService: JwtService, prisma: PrismaService, tds: TenantDataSourceService, audit: AuditService);
    login(email: string, password: string, tenantSlug: string, ip?: string, userAgent?: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            isActive: true;
            roles: string[];
            tenantId: number;
            tenantSlug: string;
            tenantName: string;
        };
    }>;
    validateUser(userId: number, tenantSlug: string): Promise<{
        id: number;
        email: string;
        fullName: string;
        roles: string[];
        tenantId: number;
        tenantSlug: string;
    }>;
}
