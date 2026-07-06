import { PrismaService } from "../prisma/prisma.service";
export declare class DbResetService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    runReset(): Promise<{
        ok: boolean;
        steps: string[];
    }>;
    private seedTenant;
    private parseUrl;
}
