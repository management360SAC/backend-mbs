import { TenantDataSourceService } from "../../../tenant/tenant-datasource.service";
import { ContactTag } from "../ContactTag";
export declare class ContactTagsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    attach(contactId: number, tagId: number): Promise<{
        contactId: number;
        tagId: number;
    } & ContactTag>;
    detach(contactId: number, tagId: number): Promise<import("typeorm").DeleteResult>;
    findByContact(contactId: number): Promise<ContactTag[]>;
}
