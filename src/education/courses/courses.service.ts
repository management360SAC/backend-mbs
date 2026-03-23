import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "../courses/Course";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
  ) {}

  async list(params: { page?: number; pageSize?: number }) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const [items, total] = await this.repo.findAndCount({
      where: { isActive: true },
      skip,
      take: pageSize,
      order: { createdAt: "DESC" },
    });

    return { page, pageSize, total, items };
  }

  async get(id: number) {
    const course = await this.repo.findOne({ where: { id } });
    if (!course) throw new NotFoundException("Curso no existe");
    return course;
  }

  async create(dto: CreateCourseDto) {
    const course = this.repo.create(dto);
    await this.repo.save(course);
    return course;
  }

  async update(id: number, dto: UpdateCourseDto) {
    await this.get(id);
    await this.repo.update({ id }, dto);
    return this.get(id);
  }

  async remove(id: number) {
    const course = await this.get(id);
    await this.repo.remove(course);
    return { ok: true };
  }
}