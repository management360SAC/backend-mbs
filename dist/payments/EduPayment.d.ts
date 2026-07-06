export declare class EduPayment {
    id: number;
    contactId: number;
    courseId: number;
    enrollmentId: number | null;
    paymentType: string;
    amount: string;
    currency: string;
    paymentMethod: string;
    paymentDate: string;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
}
