import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { AuditService } from "../audit/audit.service";
import { User } from "../users/user.entity";
import { UserRole } from "../users/user-role.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly tds: TenantDataSourceService,
    private readonly audit: AuditService,
  ) {}

  async login(email: string, password: string, tenantSlug: string, ip?: string, userAgent?: string) {
    // 1. Resolve tenant from master DB
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug, isActive: true },
    });
    if (!tenant) {
      throw new UnauthorizedException("Tenant no encontrado o inactivo");
    }

    const tenantInfo = {
      id: tenant.id,
      slug: tenant.slug,
      dbName: tenant.dbName,
      dbHost: tenant.dbHost,
      dbPort: tenant.dbPort,
      dbUser: tenant.dbUser,
      dbPass: tenant.dbPass,
    };

    // 2. Get user from tenant DB
    const userRepo = await this.tds.getRepository(User, tenantInfo);
    const user = await userRepo.findOne({
      where: { email } as any,
      relations: { userRoles: { role: true } },
    });

    if (!user || !user.isActive) {
      await this.audit.log({ tenantSlug, userEmail: email, ip, userAgent, action: "LOGIN_FAILED", module: "auth", result: "failure", metadata: { reason: "user_not_found_or_inactive" } });
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      await this.audit.log({ tenantSlug, userId: user.id, userEmail: email, ip, userAgent, action: "LOGIN_FAILED", module: "auth", result: "failure", metadata: { reason: "wrong_password" } });
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // 3. Build roles list
    const roles = (user.userRoles ?? []).map((ur: UserRole) => ur.role?.code).filter(Boolean);

    // 4. Issue JWT with tenantSlug claim
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      roles,
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
    };

    const accessToken = this.jwtService.sign(payload);

    // 5. Update last login
    await userRepo.update(user.id, { lastLoginAt: new Date() } as any);

    await this.audit.log({ tenantSlug, userId: user.id, userEmail: user.email, ip, userAgent, action: "LOGIN_SUCCESS", module: "auth", result: "success" });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isActive: user.isActive,
        roles,
        tenantId: tenant.id,
        tenantSlug: tenant.slug,
        tenantName: tenant.name,
      },
    };
  }

  async validateUser(userId: number, tenantSlug: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug, isActive: true },
    });
    if (!tenant) throw new UnauthorizedException("Tenant inactivo");

    const tenantInfo = {
      id: tenant.id,
      slug: tenant.slug,
      dbName: tenant.dbName,
      dbHost: tenant.dbHost,
      dbPort: tenant.dbPort,
      dbUser: tenant.dbUser,
      dbPass: tenant.dbPass,
    };

    const userRepo = await this.tds.getRepository(User, tenantInfo);
    const user = await userRepo.findOne({
      where: { id: userId } as any,
      relations: { userRoles: { role: true } },
    });

    if (!user || !user.isActive) throw new UnauthorizedException("Usuario no encontrado o inactivo");

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: (user.userRoles ?? []).map((ur: UserRole) => ur.role?.code).filter(Boolean),
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
    };
  }
}
