import { Repository } from "typeorm";
import { Contact } from "./Contact";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
export declare class ContactsService {
    private readonly repo;
    constructor(repo: Repository<Contact>);
    create(dto: CreateContactDto): Promise<Contact>;
    findAll(filters?: {
        type?: string;
        q?: string;
        status?: string;
        source_id?: number;
    }): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
    update(id: number, dto: UpdateContactDto): Promise<Contact>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
