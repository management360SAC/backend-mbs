import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Enrollment } from "../../education/enrollments/Enrollment"
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dto/update-enrollment.dto";

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly repo: Repository<Enrollment>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    const enrollment = this.repo.create({
      contactId: dto.contactId,              // ✅ camelCase
      courseId: dto.courseId,                // ✅ camelCase
      dealId: dto.dealId,                    // ✅ camelCase
      status: dto.status,
      amount: dto.amount?.toString() || null,
      currency: dto.currency,
      moodleEnrolledAt: dto.moodleEnrolledAt ? new Date(dto.moodleEnrolledAt) : null, // ✅ camelCase
    });

    return this.repo.save(enrollment);
  }

  async findAll() {
    return this.repo.find({
      relations: ["contact", "course", "deal"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number) {
    const enrollment = await this.repo.findOne({
      where: { id },
      relations: ["contact", "course", "deal"],
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment ${id} no encontrado`);
    }

    return enrollment;
  }

  async update(id: number, dto: UpdateEnrollmentDto) {
    await this.findOne(id);

    // ✅ IMPORTANTE: Construir objeto con propiedades en camelCase
    const updateData: any = {};

    if (dto.contactId !== undefined) updateData.contactId = dto.contactId;           // ✅ camelCase
    if (dto.courseId !== undefined) updateData.courseId = dto.courseId;              // ✅ camelCase
    if (dto.dealId !== undefined) updateData.dealId = dto.dealId;                    // ✅ camelCase
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.amount !== undefined) updateData.amount = dto.amount?.toString() || null;
    if (dto.currency !== undefined) updateData.currency = dto.currency;
    if (dto.moodleEnrolledAt !== undefined) {                                        // ✅ camelCase
      updateData.moodleEnrolledAt = dto.moodleEnrolledAt ? new Date(dto.moodleEnrolledAt) : null;
    }

    await this.repo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const enrollment = await this.findOne(id);
    await this.repo.remove(enrollment);
    return { message: `Enrollment ${id} eliminado` };
  }
}