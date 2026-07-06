import { CoursesService } from "../../education/courses/courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
export declare class CoursesController {
    private readonly service;
    constructor(service: CoursesService);
    list(page?: number, pageSize?: number): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: import("./Course").Course[];
    }>;
    get(id: number): Promise<import("./Course").Course>;
    create(dto: CreateCourseDto): Promise<import("./Course").Course>;
    update(id: number, dto: UpdateCourseDto): Promise<import("./Course").Course>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
