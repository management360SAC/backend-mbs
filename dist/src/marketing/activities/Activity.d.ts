import { Contact } from "../contacts/Contact";
import { Deal } from "../deals/Deal";
import { User } from "../../users/user.entity";
export declare class Activity {
    id: number;
    contact?: Contact;
    contactId?: number;
    deal?: Deal;
    dealId?: number;
    assignedUser: User;
    assignedTo: number;
    type: string;
    subject: string;
    description?: string;
    dueAt?: Date;
    doneAt?: Date;
    createdBy?: number;
    createdAt: Date;
    updatedAt: Date;
}
