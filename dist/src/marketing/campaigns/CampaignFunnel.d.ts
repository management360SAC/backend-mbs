import { Campaign } from "./Campaign";
import { FunnelStage } from "../funnel-stages/FunnelStage";
export declare class CampaignFunnel {
    campaign_id: number;
    funnel_stage_id: number;
    created_at: Date;
    campaign: Campaign;
    funnel_stage: FunnelStage;
}
