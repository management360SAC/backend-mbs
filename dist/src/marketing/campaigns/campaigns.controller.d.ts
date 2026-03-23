import { CampaignsService } from "./campaigns.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { UpdateCampaignDto } from "./dto/update-campaign.dto";
import { SendCampaignDto } from "./dto/send-campaign.dto";
import { SetFunnelStagesDto } from "./dto/set-funnel-stages.dto";
export declare class CampaignsController {
    private readonly service;
    constructor(service: CampaignsService);
    create(dto: CreateCampaignDto): Promise<import("./Campaign").Campaign>;
    findAll(type?: string, status?: string, q?: string): Promise<import("./Campaign").Campaign[]>;
    findOne(id: string): Promise<import("./Campaign").Campaign>;
    update(id: string, dto: UpdateCampaignDto): Promise<import("./Campaign").Campaign>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
    getFunnelStages(id: string): Promise<import("../funnel-stages/FunnelStage").FunnelStage[]>;
    setFunnelStages(id: string, dto: SetFunnelStagesDto): Promise<import("../funnel-stages/FunnelStage").FunnelStage[]>;
    getStats(id: string): Promise<{
        campaign_id: number;
        deals: {
            total: any;
            won: number;
            lost: number;
            open: number;
            revenue: number;
        };
        sends: {
            sent: number;
            failed: number;
        };
        funnel_stages: {
            id: number;
            name: string;
            position: number;
        }[];
    }>;
    sendCampaign(id: string, dto: SendCampaignDto): Promise<{
        sent: number;
        failed: number;
        total: number;
        errors: string[];
    }>;
    getSends(id: string): Promise<import("./CampaignSend").CampaignSend[]>;
}
