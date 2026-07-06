import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Enrollment } from "../../education/enrollments/Enrollment";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dto/update-enrollment.dto";
export declare class EnrollmentsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    create(dto: CreateEnrollmentDto): Promise<Enrollment>;
    findAll(): Promise<Enrollment[]>;
    findOne(id: number): Promise<Enrollment>;
    update(id: number, dto: UpdateEnrollmentDto): Promise<Enrollment>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
