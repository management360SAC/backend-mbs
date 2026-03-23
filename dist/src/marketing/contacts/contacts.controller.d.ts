import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
export declare class ContactsController {
    private readonly service;
    constructor(service: ContactsService);
    create(dto: CreateContactDto): Promise<import("./Contact").Contact>;
    findAll(type?: string, q?: string, status?: string, sourceId?: string): Promise<import("./Contact").Contact[]>;
    findOne(id: string): Promise<import("./Contact").Contact>;
    update(id: string, dto: UpdateContactDto): Promise<import("./Contact").Contact>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
