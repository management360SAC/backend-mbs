import type { LeadStatus } from '../../contacts/Contact';
export declare class CreateContactDto {
    type?: string;
    full_name: string;
    email?: string;
    phone?: string;
    document_id?: string;
    company?: string;
    country?: string;
    city?: string;
    source_id?: number;
    owner_user_id?: number;
    status?: LeadStatus;
    score?: number;
    lost_reason?: string;
    created_by?: number;
}
