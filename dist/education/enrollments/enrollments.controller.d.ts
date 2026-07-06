import { EnrollmentsService } from "./enrollments.service";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dto/update-enrollment.dto";
export declare class EnrollmentsController {
    private readonly service;
    constructor(service: EnrollmentsService);
    create(dto: CreateEnrollmentDto): Promise<import("./Enrollment").Enrollment>;
    findAll(): Promise<import("./Enrollment").Enrollment[]>;
    findOne(id: string): Promise<import("./Enrollment").Enrollment>;
    update(id: string, dto: UpdateEnrollmentDto): Promise<import("./Enrollment").Enrollment>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
