import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
export declare class ContactsController {
    private readonly service;
    constructor(service: ContactsService);
    create(dto: CreateContactDto): Promise<import("./Contact").Contact>;
    importLeads(file: any): Promise<{
        created: number;
        errors: {
            row: number;
            reason: string;
        }[];
    }>;
    findAll(type?: string, q?: string, status?: string, sourceId?: string, page?: string, limit?: string): Promise<{
        items: import("./Contact").Contact[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./Contact").Contact>;
    update(id: string, dto: UpdateContactDto): Promise<import("./Contact").Contact>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
