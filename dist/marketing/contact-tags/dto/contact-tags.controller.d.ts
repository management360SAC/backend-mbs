import { ContactTagsService } from "./contact-tags.service";
import { AttachTagDto } from "../../contact-tags/dto/attach-tag.dto";
export declare class ContactTagsController {
    private readonly service;
    constructor(service: ContactTagsService);
    attach(dto: AttachTagDto): Promise<{
        contactId: number;
        tagId: number;
    } & import("../ContactTag").ContactTag>;
    detach(contactId: number, tagId: number): Promise<import("typeorm").DeleteResult>;
    listByContact(contactId: number): Promise<import("../ContactTag").ContactTag[]>;
}
