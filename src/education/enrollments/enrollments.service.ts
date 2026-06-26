import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Enrollment } from "../../education/enrollments/Enrollment";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dto/update-enrollment.dto";

@Injectable()
export class EnrollmentsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateEnrollmentDto) {
    const repo = await this.tds.getRepository(Enrollment);
    const enrollment = repo.create({
      contactId: dto.contactId,
      courseId: dto.courseId,
      dealId: dto.dealId,
      status: dto.status,
      amount: dto.amount?.toString() || null,
      currency: dto.currency,
      moodleEnrolledAt: dto.moodleEnrolledAt ? new Date(dto.moodleEnrolledAt) : null,
    });

    return repo.save(enrollment);
  }

  async findAll() {
    const repo = await this.tds.getRepository(Enrollment);
    return repo.find({
      relations: ["contact", "course", "deal"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(Enrollment);
    const enrollment = await repo.findOne({
      where: { id },
      relations: ["contact", "course", "deal"],
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment ${id} no encontrado`);
    }

    return enrollment;
  }

  async update(id: number, dto: UpdateEnrollmentDto) {
    const repo = await this.tds.getRepository(Enrollment);
    await this.findOne(id);

    const updateData: any = {};

    if (dto.contactId !== undefined) updateData.contactId = dto.contactId;
    if (dto.courseId !== undefined) updateData.courseId = dto.courseId;
    if (dto.dealId !== undefined) updateData.dealId = dto.dealId;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.amount !== undefined) updateData.amount = dto.amount?.toString() || null;
    if (dto.currency !== undefined) updateData.currency = dto.currency;
    if (dto.moodleEnrolledAt !== undefined) {
      updateData.moodleEnrolledAt = dto.moodleEnrolledAt ? new Date(dto.moodleEnrolledAt) : null;
    }

    await repo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(Enrollment);
    const enrollment = await this.findOne(id);
    await repo.remove(enrollment);
    return { message: `Enrollment ${id} eliminado` };
  }
}
