import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Contact } from "./Contact";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
export declare class ContactsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    create(dto: CreateContactDto): Promise<Contact>;
    findAll(filters?: {
        type?: string;
        q?: string;
        status?: string;
        source_id?: number;
        page?: number;
        limit?: number;
    }): Promise<{
        items: Contact[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Contact>;
    update(id: number, dto: UpdateContactDto): Promise<Contact>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    importContacts(buffer: Buffer): Promise<{
        created: number;
        errors: {
            row: number;
            reason: string;
        }[];
    }>;
}
