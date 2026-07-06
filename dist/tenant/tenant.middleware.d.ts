import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "./tenant-datasource.service";
export declare class TenantMiddleware implements NestMiddleware {
    private readonly prisma;
    private readonly tds;
    private readonly logger;
    constructor(prisma: PrismaService, tds: TenantDataSourceService);
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
