export declare class CampaignSend {
    id: number;
    campaign_id: number;
    contact_id: number | null;
    contact_email: string;
    contact_name: string;
    status: string;
    error_msg: string | null;
    sent_at: Date;
}
