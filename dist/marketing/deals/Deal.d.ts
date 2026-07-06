import { Contact } from "../contacts/Contact";
import { Campaign } from "../campaigns/Campaign";
import { FunnelStage } from "../funnel-stages/FunnelStage";
import { User } from "../../users/user.entity";
export type DealStatus = "open" | "won" | "lost";
export declare class Deal {
    id: string;
    contactId: string;
    campaignId: string | null;
    stageId: string;
    ownerUserId: string | null;
    createdBy: string;
    title: string;
    amount: string;
    currency: string;
    probability: number | null;
    expectedCloseDate: Date | null;
    status: DealStatus;
    lostReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    contact: Contact;
    campaign: Campaign | null;
    stage: FunnelStage;
    owner: User | null;
    creator: User;
}
