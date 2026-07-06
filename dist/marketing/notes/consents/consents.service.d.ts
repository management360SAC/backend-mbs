import { TenantDataSourceService } from "../../../tenant/tenant-datasource.service";
import { Consent } from "../../notes/consents/Consent";
export declare class ConsentsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
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
