import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
export declare class PaymentsController {
    private readonly service;
    constructor(service: PaymentsService);
    findAll(contact_id?: number, course_id?: number): Promise<{
        id: any;
        contact_id: any;
        contact_name: any;
        course_id: any;
        course_name: any;
        enrollment_id: any;
        payment_type: any;
        amount: number;
        currency: any;
        payment_method: any;
        payment_date: any;
        notes: any;
        created_at: any;
        updated_at: any;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        contact_id: number;
        course_id: number;
        enrollment_id: number | null;
        payment_type: string;
        amount: number;
        currency: string;
        payment_method: string;
        payment_date: string;
        notes: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    create(dto: CreatePaymentDto): Promise<{
        id: number;
        contact_id: number;
        course_id: number;
        enrollment_id: number | null;
        payment_type: string;
        amount: number;
        currency: string;
        payment_method: string;
        payment_date: string;
        notes: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: number, dto: UpdatePaymentDto): Promise<{
        id: number;
        contact_id: number;
        course_id: number;
        enrollment_id: number | null;
        payment_type: string;
        amount: number;
        currency: string;
        payment_method: string;
        payment_date: string;
        notes: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
