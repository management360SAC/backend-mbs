export declare class CreateDealDto {
    contactId: number;
    campaignId?: number;
    title: string;
    stageId: number;
    amount: number;
    currency?: string;
    probability?: number;
    expectedCloseDate?: string;
}
