import { ConsentsService } from "./consents.service";
import { CreateConsentDto } from "../../notes/consents/dto/create-consent.dto";
export declare class ConsentsController {
    private readonly service;
    constructor(service: ConsentsService);
    grant(dto: CreateConsentDto): Promise<{
        contactId: number;
        consentType: string;
        granted: true;
        grantedAt: Date;
        revokedAt: null;
    } & import("./Consent").Consent>;
    revoke(id: number): Promise<import("typeorm").UpdateResult>;
    list(contactId: number): Promise<import("./Consent").Consent[]>;
}
