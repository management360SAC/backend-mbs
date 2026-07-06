import { PrismaService } from "../prisma/prisma.service";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { SubmitFormDto } from "./dto/submit-form.dto";
export declare class WebFormService {
    private readonly prisma;
    private readonly tds;
    private readonly logger;
    constructor(prisma: PrismaService, tds: TenantDataSourceService);
    submitLead(apiKey: string, dto: SubmitFormDto): Promise<void>;
    private saveContact;
    private getOrCreateSource;
}
