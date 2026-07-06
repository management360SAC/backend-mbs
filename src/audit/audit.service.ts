import { Injectable, Logger } from "@nestjs/common";
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

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tds: TenantDataSourceService,
  ) {}

  async list(tenantSlug: string, opts: { page?: number; limit?: number; action?: string } = {}): Promise<{ items: AuditLog[]; total: number }> {
    try {
      const tenant = await this.prisma.tenant.findUnique({ where: { slug: tenantSlug } });
      if (!tenant) return { items: [], total: 0 };

      const info = {
        id: tenant.id, slug: tenant.slug, dbName: tenant.dbName,
        dbHost: tenant.dbHost, dbPort: tenant.dbPort,
        dbUser: tenant.dbUser, dbPass: tenant.dbPass,
      };

      const repo = await this.tds.getRepository(AuditLog, info);
      const page = opts.page ?? 1;
      const limit = Math.min(opts.limit ?? 50, 200);
      const skip = (page - 1) * limit;

      const qb = repo.createQueryBuilder("a").orderBy("a.createdAt", "DESC").skip(skip).take(limit);
      if (opts.action) qb.where("a.action = :action", { action: opts.action });

      const [items, total] = await qb.getManyAndCount();
      return { items, total };
    } catch (err: any) {
      this.logger.error(`Audit list failed: ${err?.message}`);
      return { items: [], total: 0 };
    }
  }

  async log(entry: AuditEntry): Promise<void> {
    try {
      const tenant = await this.prisma.tenant.findUnique({ where: { slug: entry.tenantSlug } });
      if (!tenant) return;

      const info = {
        id: tenant.id, slug: tenant.slug, dbName: tenant.dbName,
        dbHost: tenant.dbHost, dbPort: tenant.dbPort,
        dbUser: tenant.dbUser, dbPass: tenant.dbPass,
      };

      const repo = await this.tds.getRepository(AuditLog, info);
      await repo.save(repo.create({
        tenantSlug: entry.tenantSlug,
        userId: entry.userId ?? null,
        userEmail: entry.userEmail ?? null,
        ip: entry.ip ?? null,
        userAgent: entry.userAgent ? entry.userAgent.substring(0, 500) : null,
        action: entry.action,
        module: entry.module,
        entity: entry.entity ?? null,
        entityId: entry.entityId ?? null,
        result: entry.result ?? "success",
        metadata: entry.metadata ?? null,
      }));
    } catch (err: any) {
      this.logger.error(`Audit log failed: ${err?.message}`);
    }
  }
}
