import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { TenantContext } from "./tenant.context";
import { TenantDataSourceService } from "./tenant-datasource.service";

function decodeJwtPayload(token: string): any {
  try {
    const [, b64] = token.split(".");
    return JSON.parse(Buffer.from(b64, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tds: TenantDataSourceService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers["authorization"];
    if (!auth?.startsWith("Bearer ")) return next();

    const token = auth.slice(7);
    const payload = decodeJwtPayload(token);
    if (!payload?.tenantSlug) return next();

    try {
      const tenant = await this.prisma.tenant.findUnique({
        where: { slug: payload.tenantSlug, isActive: true },
      });

      if (!tenant) {
        this.logger.warn(`Tenant not found or inactive: ${payload.tenantSlug}`);
        return next();
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

      // Pre-warm connection pool for this tenant
      await this.tds.getDataSource(tenantInfo);

      TenantContext.run(tenantInfo, () => next());
    } catch (err) {
      this.logger.error("TenantMiddleware error", err);
      next();
    }
  }
}
