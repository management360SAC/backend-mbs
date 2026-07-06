import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Deal } from "../../marketing/deals/Deal";
import { CreateDealDto } from "./dto/create-deal.dto";
import { UpdateDealDto } from "./dto/update-deal.dto";
export declare class DealsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    list(params: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: Deal[];
    }>;
    get(id: string): Promise<Deal>;
    create(dto: CreateDealDto): Promise<Deal>;
    update(id: string, dto: UpdateDealDto): Promise<Deal>;
    changeStage(params: {
        dealId: string;
        toStageId: string;
        changedById?: string | null;
    }): Promise<Deal | null>;
}
