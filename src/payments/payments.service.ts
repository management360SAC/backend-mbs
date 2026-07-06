import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { EduPayment } from "./EduPayment";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async findAll(params?: { contact_id?: number; course_id?: number; page?: number; limit?: number }) {
    const repo = await this.tds.getRepository(EduPayment);
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;

    const qb = repo
      .createQueryBuilder("p")
      .leftJoin("contacts", "c", "c.id = p.contact_id")
      .leftJoin("courses", "ec", "ec.id = p.course_id")
      .addSelect("c.full_name", "contact_name")
      .addSelect("ec.name", "course_name")
      .orderBy("p.createdAt", "DESC");

    if (params?.contact_id) qb.andWhere("p.contactId = :cid", { cid: params.contact_id });
    if (params?.course_id) qb.andWhere("p.courseId = :crid", { crid: params.course_id });

    const total = await qb.getCount();
    qb.skip((page - 1) * limit).take(limit);
    const raw = await qb.getRawMany();
    const items = raw.map((r) => this.serializeRaw(r));
    return { items, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(EduPayment);
    const p = await repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Pago ${id} no encontrado`);
    return this.serialize(p);
  }

  async create(dto: CreatePaymentDto) {
    const repo = await this.tds.getRepository(EduPayment);
    const note = dto.note ?? dto.notes ?? null;
    const payment = repo.create({
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
    const saved = await repo.save(payment);
    return this.serialize(saved);
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const repo = await this.tds.getRepository(EduPayment);
    const payment = await repo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Pago ${id} no encontrado`);

    if (dto.contact_id !== undefined) payment.contactId = dto.contact_id;
    if (dto.course_id !== undefined) payment.courseId = dto.course_id;
    if (dto.enrollment_id !== undefined) payment.enrollmentId = dto.enrollment_id ?? null;
    if (dto.payment_type !== undefined) payment.paymentType = dto.payment_type;
    if (dto.amount !== undefined) payment.amount = String(dto.amount);
    if (dto.currency !== undefined) payment.currency = dto.currency;
    if (dto.payment_method !== undefined) payment.paymentMethod = dto.payment_method;
    if (dto.payment_date !== undefined) payment.paymentDate = dto.payment_date;
    if (dto.note !== undefined || dto.notes !== undefined)
      payment.note = dto.note ?? dto.notes ?? null;

    const saved = await repo.save(payment);
    return this.serialize(saved);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(EduPayment);
    const payment = await repo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Pago ${id} no encontrado`);
    await repo.remove(payment);
    return { ok: true };
  }

  private serialize(p: EduPayment) {
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

  private serializeRaw(r: Record<string, any>) {
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
}
