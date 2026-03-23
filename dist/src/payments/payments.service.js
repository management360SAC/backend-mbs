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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const EduPayment_1 = require("./EduPayment");
let PaymentsService = class PaymentsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(params) {
        const qb = this.repo
            .createQueryBuilder("p")
            .leftJoin("mk_contacts", "c", "c.id = p.contact_id")
            .leftJoin("edu_courses", "ec", "ec.id = p.course_id")
            .addSelect("c.full_name", "contact_name")
            .addSelect("ec.name", "course_name")
            .orderBy("p.createdAt", "DESC");
        if (params?.contact_id)
            qb.andWhere("p.contactId = :cid", { cid: params.contact_id });
        if (params?.course_id)
            qb.andWhere("p.courseId = :crid", { crid: params.course_id });
        const raw = await qb.getRawMany();
        return raw.map((r) => this.serializeRaw(r));
    }
    async findOne(id) {
        const p = await this.repo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Pago ${id} no encontrado`);
        return this.serialize(p);
    }
    async create(dto) {
        const note = dto.note ?? dto.notes ?? null;
        const payment = this.repo.create({
            contactId: dto.contact_id,
            courseId: dto.course_id,
            enrollmentId: dto.enrollment_id ?? null,
            paymentType: dto.payment_type,
            amount: String(dto.amount),
            currency: dto.currency ?? "PEN",
            paymentMethod: dto.payment_method,
            paymentDate: dto.payment_date,
            note,
        });
        const saved = await this.repo.save(payment);
        return this.serialize(saved);
    }
    async update(id, dto) {
        const payment = await this.repo.findOne({ where: { id } });
        if (!payment)
            throw new common_1.NotFoundException(`Pago ${id} no encontrado`);
        if (dto.contact_id !== undefined)
            payment.contactId = dto.contact_id;
        if (dto.course_id !== undefined)
            payment.courseId = dto.course_id;
        if (dto.enrollment_id !== undefined)
            payment.enrollmentId = dto.enrollment_id ?? null;
        if (dto.payment_type !== undefined)
            payment.paymentType = dto.payment_type;
        if (dto.amount !== undefined)
            payment.amount = String(dto.amount);
        if (dto.currency !== undefined)
            payment.currency = dto.currency;
        if (dto.payment_method !== undefined)
            payment.paymentMethod = dto.payment_method;
        if (dto.payment_date !== undefined)
            payment.paymentDate = dto.payment_date;
        if (dto.note !== undefined || dto.notes !== undefined)
            payment.note = dto.note ?? dto.notes ?? null;
        const saved = await this.repo.save(payment);
        return this.serialize(saved);
    }
    async remove(id) {
        const payment = await this.repo.findOne({ where: { id } });
        if (!payment)
            throw new common_1.NotFoundException(`Pago ${id} no encontrado`);
        await this.repo.remove(payment);
        return { ok: true };
    }
    serialize(p) {
        return {
            id: p.id,
            contact_id: p.contactId,
            course_id: p.courseId,
            enrollment_id: p.enrollmentId,
            payment_type: p.paymentType,
            amount: Number(p.amount),
            currency: p.currency,
            payment_method: p.paymentMethod,
            payment_date: p.paymentDate,
            notes: p.note,
            created_at: p.createdAt,
            updated_at: p.updatedAt,
        };
    }
    serializeRaw(r) {
        return {
            id: r.p_id,
            contact_id: r.p_contact_id,
            contact_name: r.contact_name ?? null,
            course_id: r.p_course_id,
            course_name: r.course_name ?? null,
            enrollment_id: r.p_enrollment_id,
            payment_type: r.p_payment_type,
            amount: Number(r.p_amount),
            currency: r.p_currency,
            payment_method: r.p_payment_method,
            payment_date: r.p_payment_date,
            notes: r.p_note,
            created_at: r.p_created_at,
            updated_at: r.p_updated_at,
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EduPayment_1.EduPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map