import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Lead } from "./Lead";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
interface ListParams {
    q?: string;
    page?: number;
    pageSize?: number;
    sourceId?: number;
    sellerId?: number;
    stageId?: number;
}
export declare class LeadsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    list(params: ListParams): Promise<{
        items: Lead[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    get(id: number): Promise<Lead>;
    create(dto: CreateLeadDto): Promise<Lead[]>;
    update(id: number, dto: UpdateLeadDto): Promise<Lead>;
    changeStage(id: number, currentStageId: number): Promise<Lead>;
    assignSeller(id: number, sellerId: number | null): Promise<Lead>;
}
export {};
