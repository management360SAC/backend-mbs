export declare const CAMPAIGN_TYPES: readonly ["EMAIL", "FACEBOOK", "WHATSAPP", "SMS", "LANDING", "OTHER"];
export type CampaignType = (typeof CAMPAIGN_TYPES)[number];
export declare const CAMPAIGN_STATUSES: readonly ["draft", "active", "paused", "completed", "inactive"];
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];
export declare class Campaign {
    id: number;
    name: string;
    type: CampaignType;
    url: string | null;
    status: string;
    start_date: string | null;
    end_date: string | null;
    budget: string | null;
    channel: string;
    subject: string | null;
    body_html: string | null;
    sender_name: string | null;
    recursos: string | null;
    created_by: number | null;
    created_at: Date;
    updated_at: Date;
}
