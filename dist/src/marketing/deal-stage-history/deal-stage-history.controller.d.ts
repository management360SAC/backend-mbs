import { DealStageHistoryService } from "./deal-stage-history.service";
export declare class DealStageHistoryController {
    private readonly service;
    constructor(service: DealStageHistoryService);
    list(dealId: number): Promise<import("./DealStageHistory").DealStageHistory[]>;
}
