import { LeadSource } from "../../marketing/lead-sources/LeadSource";
import { Seller } from "../../marketing/sellers/Seller";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";
export declare class Lead {
    id: number;
    fullName: string;
    email?: string | null;
    phone?: string | null;
    notes?: string | null;
    expectedValue?: number | null;
    sourceId?: number | null;
    sellerId?: number | null;
    currentStageId: number;
    source?: LeadSource | null;
    seller?: Seller | null;
    currentStage: LeadStage;
    createdAt: Date;
    updatedAt: Date;
}
