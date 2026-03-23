import { Repository } from "typeorm";
import { Consent } from "../../notes/consents/Consent";
export declare class ConsentsService {
    private readonly repo;
    constructor(repo: Repository<Consent>);
    grant(contactId: number, consentType: string): Promise<{
        contactId: number;
        consentType: string;
        granted: true;
        grantedAt: Date;
        revokedAt: null;
    } & Consent>;
    revoke(id: number): Promise<import("typeorm").UpdateResult>;
    findByContact(contactId: number): Promise<Consent[]>;
}
