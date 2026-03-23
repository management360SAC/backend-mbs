import { Repository } from "typeorm";
import { DealStageHistory } from "./DealStageHistory";
export declare class DealStageHistoryService {
    private readonly repo;
    constructor(repo: Repository<DealStageHistory>);
    listByDeal(dealId: number): Promise<DealStageHistory[]>;
}
