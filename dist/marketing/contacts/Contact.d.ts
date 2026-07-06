export type LeadStatus = "new" | "contacted" | "qualified" | "nurturing" | "won" | "lost";
export declare class Contact {
    id: number;
    type: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    document_id: string | null;
    company: string | null;
    country: string | null;
    city: string | null;
    source_id: number | null;
    owner_user_id: number | null;
    status: LeadStatus;
    score: number | null;
    lost_reason: string | null;
    created_by: number | null;
    created_at: Date;
    updated_at: Date;
}
