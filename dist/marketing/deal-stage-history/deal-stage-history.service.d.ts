import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { DealStageHistory } from "./DealStageHistory";
export declare class DealStageHistoryService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    listByDeal(dealId: number): Promise<DealStageHistory[]>;
}
