import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Course } from "../courses/Course";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CoursesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async list(params: { page?: number; pageSize?: number }) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const repo = await this.tds.getRepository(Course);
    const [items, total] = await repo.findAndCount({
      where: { isActive: true },
      skip,
      take: pageSize,
      order: { createdAt: "DESC" },
    });

    return { page, pageSize, total, items };
  }

  async get(id: number) {
    const repo = await this.tds.getRepository(Course);
    const course = await repo.findOne({ where: { id } });
    if (!course) throw new NotFoundException("Curso no existe");
    return course;
  }

  async create(dto: CreateCourseDto) {
    const repo = await this.tds.getRepository(Course);
    const course = repo.create(dto);
    await repo.save(course);
    return course;
  }

  async update(id: number, dto: UpdateCourseDto) {
    const repo = await this.tds.getRepository(Course);
    await this.get(id);
    const patch: Partial<Course> = {};
    if (dto.code       !== undefined) patch.code           = dto.code;
    if (dto.name       !== undefined) patch.name           = dto.name;
    if (dto.description !== undefined) patch.description   = dto.description ?? null;
    if (dto.price      !== undefined) patch.price          = dto.price ?? null;
    if (dto.currency   !== undefined) patch.currency       = dto.currency;
    if (dto.is_active  !== undefined) patch.isActive       = dto.is_active;
    if (dto.moodle_course_id !== undefined) patch.moodleCourseId = dto.moodle_course_id ?? null;
    await repo.update({ id }, patch);
    return this.get(id);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(Course);
    const course = await this.get(id);
    await repo.remove(course);
    return { ok: true };
  }
}
