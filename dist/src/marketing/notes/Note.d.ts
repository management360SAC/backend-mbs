import { Contact } from "../contacts/Contact";
import { Deal } from "../deals/Deal";
import { User } from "../../users/user.entity";
export declare class Note {
    id: string;
    contactId: string | null;
    dealId: string | null;
    createdBy: string;
    note: string;
    createdAt: Date;
    contact: Contact | null;
    deal: Deal | null;
    creator: User;
}
