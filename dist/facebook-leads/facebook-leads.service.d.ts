import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
export declare class FacebookLeadsService {
    private readonly prisma;
    private readonly tds;
    private readonly logger;
    constructor(prisma: PrismaService, tds: TenantDataSourceService);
    processLeadgenId(leadgenId: string, pageId?: string): Promise<void>;
    private processAndPropagate;
    private fetchAndSaveLead;
    private getOrCreateFacebookSource;
    private getFirstStage;
}
