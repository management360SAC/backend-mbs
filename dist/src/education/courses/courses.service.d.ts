import { Repository } from "typeorm";
import { Course } from "../courses/Course";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
export declare class CoursesService {
    private readonly repo;
    constructor(repo: Repository<Course>);
    list(params: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: Course[];
    }>;
    get(id: number): Promise<Course>;
    create(dto: CreateCourseDto): Promise<Course>;
    update(id: number, dto: UpdateCourseDto): Promise<Course>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
