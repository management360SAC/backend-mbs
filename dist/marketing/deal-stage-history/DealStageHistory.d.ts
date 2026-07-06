import { Deal } from "../../marketing/deals/Deal";
import { FunnelStage } from "../../marketing/funnel-stages/FunnelStage";
import { User } from "../../users/user.entity";
export declare class DealStageHistory {
    id: number;
    deal_id: number;
    from_stage_id: number;
    to_stage_id: number;
    changed_by_id: number | null;
    deal: Deal;
    from_stage: FunnelStage;
    to_stage: FunnelStage;
    changed_by: User | null;
    changed_at: Date;
}
