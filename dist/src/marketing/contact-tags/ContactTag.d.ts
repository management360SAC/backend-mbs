import { Contact } from "../contacts/Contact";
import { Tag } from "../tags/Tag";
export declare class ContactTag {
    contactId: number;
    tagId: number;
    contact: Contact;
    tag: Tag;
    createdAt: Date;
}
