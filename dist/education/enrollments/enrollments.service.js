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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Enrollment_1 = require("../../education/enrollments/Enrollment");
let EnrollmentsService = class EnrollmentsService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(Enrollment_1.Enrollment);
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
        const repo = await this.tds.getRepository(Enrollment_1.Enrollment);
        return repo.find({
            relations: ["contact", "course", "deal"],
            order: { createdAt: "DESC" },
        });
    }
    async findOne(id) {
        const repo = await this.tds.getRepository(Enrollment_1.Enrollment);
        const enrollment = await repo.findOne({
            where: { id },
            relations: ["contact", "course", "deal"],
        });
        if (!enrollment) {
            throw new common_1.NotFoundException(`Enrollment ${id} no encontrado`);
        }
        return enrollment;
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Enrollment_1.Enrollment);
        await this.findOne(id);
        const updateData = {};
        if (dto.contactId !== undefined)
            updateData.contactId = dto.contactId;
        if (dto.courseId !== undefined)
            updateData.courseId = dto.courseId;
        if (dto.dealId !== undefined)
            updateData.dealId = dto.dealId;
        if (dto.status !== undefined)
            updateData.status = dto.status;
        if (dto.amount !== undefined)
            updateData.amount = dto.amount?.toString() || null;
        if (dto.currency !== undefined)
            updateData.currency = dto.currency;
        if (dto.moodleEnrolledAt !== undefined) {
            updateData.moodleEnrolledAt = dto.moodleEnrolledAt ? new Date(dto.moodleEnrolledAt) : null;
        }
        await repo.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(Enrollment_1.Enrollment);
        const enrollment = await this.findOne(id);
        await repo.remove(enrollment);
        return { message: `Enrollment ${id} eliminado` };
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map