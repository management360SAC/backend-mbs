import { Contact } from "../../contacts/Contact";
export declare class Consent {
    id: number;
    contactId: number;
    consentType: string;
    granted: boolean;
    grantedAt: Date | null;
    revokedAt: Date | null;
    contact: Contact;
    createdAt: Date;
}
