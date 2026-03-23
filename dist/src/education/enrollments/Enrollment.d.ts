import { Contact } from "../../marketing/contacts/Contact";
import { Course } from "../../education/courses/Course";
import { Deal } from "../../marketing/deals/Deal";
export declare class Enrollment {
    id: number;
    contactId: number;
    courseId: number;
    dealId: number | null;
    status: string;
    amount: string | null;
    currency: string;
    moodleEnrolledAt: Date | null;
    createdAt: Date;
    contact: Contact;
    course: Course;
    deal: Deal | null;
}
