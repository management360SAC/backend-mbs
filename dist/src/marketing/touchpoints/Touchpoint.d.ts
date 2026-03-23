import { Contact } from "../contacts/Contact";
import { Campaign } from "../campaigns/Campaign";
export declare class Touchpoint {
    id: string;
    contactId: string;
    campaignId: string | null;
    eventType: string;
    eventAt: Date | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    utmTerm: string | null;
    utmContent: string | null;
    referrer: string | null;
    landingUrl: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    contact: Contact;
    campaign: Campaign | null;
}
