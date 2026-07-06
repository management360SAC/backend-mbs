"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Course_1 = require("../courses/Course");
let CoursesService = class CoursesService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async list(params) {
        const page = params.page ?? 1;
        const pageSize = params.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const repo = await this.tds.getRepository(Course_1.Course);
        const [items, total] = await repo.findAndCount({
            where: { isActive: true },
            skip,
            take: pageSize,
            order: { createdAt: "DESC" },
        });
        return { page, pageSize, total, items };
    }
    async get(id) {
        const repo = await this.tds.getRepository(Course_1.Course);
        const course = await repo.findOne({ where: { id } });
        if (!course)
            throw new common_1.NotFoundException("Curso no existe");
        return course;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(Course_1.Course);
        const course = repo.create(dto);
        await repo.save(course);
        return course;
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Course_1.Course);
        await this.get(id);
        const patch = {};
        if (dto.code !== undefined)
            patch.code = dto.code;
        if (dto.name !== undefined)
            patch.name = dto.name;
        if (dto.description !== undefined)
            patch.description = dto.description ?? null;
        if (dto.price !== undefined)
            patch.price = dto.price ?? null;
        if (dto.currency !== undefined)
            patch.currency = dto.currency;
        if (dto.is_active !== undefined)
            patch.isActive = dto.is_active;
        if (dto.moodle_course_id !== undefined)
            patch.moodleCourseId = dto.moodle_course_id ?? null;
        await repo.update({ id }, patch);
        return this.get(id);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(Course_1.Course);
        const course = await this.get(id);
        await repo.remove(course);
        return { ok: true };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map