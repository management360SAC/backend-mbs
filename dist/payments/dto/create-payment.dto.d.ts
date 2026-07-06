export declare class CreatePaymentDto {
    contact_id: number;
    course_id: number;
    enrollment_id?: number;
    payment_type: string;
    amount: number;
    currency?: string;
    payment_method: string;
    payment_date: string;
    note?: string;
    notes?: string;
}
