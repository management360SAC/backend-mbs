import { Repository } from "typeorm";
import { ContactTag } from "../ContactTag";
export declare class ContactTagsService {
    private readonly repo;
    constructor(repo: Repository<ContactTag>);
    attach(contactId: number, tagId: number): Promise<{
        contactId: number;
        tagId: number;
    } & ContactTag>;
    detach(contactId: number, tagId: number): Promise<import("typeorm").DeleteResult>;
    findByContact(contactId: number): Promise<ContactTag[]>;
}
