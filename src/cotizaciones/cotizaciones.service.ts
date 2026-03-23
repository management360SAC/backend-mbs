import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cotizacion } from "./Cotizacion";
import { CotizacionDetalle } from "./CotizacionDetalle";
import { CotizacionEnvio } from "./CotizacionEnvio";
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto";
import { CambiarEstadoDto, UpdateCotizacionDto } from "./dto/update-cotizacion.dto";
import { SendCotizacionDto } from "./dto/send-cotizacion.dto";
import { PdfService } from "./pdf.service";
import { EmailService } from "./email.service";

@Injectable()
export class CotizacionesService {
  constructor(
    @InjectRepository(Cotizacion)
    private readonly cotRepo: Repository<Cotizacion>,
    @InjectRepository(CotizacionDetalle)
    private readonly detalleRepo: Repository<CotizacionDetalle>,
    @InjectRepository(CotizacionEnvio)
    private readonly envioRepo: Repository<CotizacionEnvio>,
    private readonly pdfService: PdfService,
    private readonly emailService: EmailService,
  ) {}

  // ─── HELPERS ────────────────────────────────────────────────────────────────

  private async generateNumero(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.cotRepo.count();
    const seq = String(count + 1).padStart(4, "0");
    return `COT-${year}-${seq}`;
  }

  private calcTotals(
    detalles: { cantidad: number; precio_unitario: number; descuento_pct: number }[],
    descuento_pct: number,
    impuesto_pct: number,
  ) {
    const subtotalBruto = detalles.reduce((acc, d) => {
      const linea = Number(d.cantidad) * Number(d.precio_unitario);
      const descLinea = linea * (Number(d.descuento_pct) / 100);
      return acc + (linea - descLinea);
    }, 0);

    const descuento_monto = subtotalBruto * (Number(descuento_pct) / 100);
    const base = subtotalBruto - descuento_monto;
    const impuesto_monto = base * (Number(impuesto_pct) / 100);
    const total = base + impuesto_monto;

    return {
      subtotal: Number(subtotalBruto.toFixed(2)),
      descuento_monto: Number(descuento_monto.toFixed(2)),
      impuesto_monto: Number(impuesto_monto.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  /** Update mk_contacts.status and mk_leads.current_stage_id when cotización state changes */
  private async syncContactStatus(contactId: number | null | undefined, cotEstado: string): Promise<void> {
    if (!contactId) return;

    // Map cotización estado → mk_contacts.status
    const statusMap: Record<string, string> = {
      ENVIADA:   "proposal_sent",
      GENERADA:  "proposal_sent",
      ACEPTADA:  "won",
      RECHAZADA: "lost",
    };
    const newStatus = statusMap[cotEstado];
    if (!newStatus) return;

    try {
      await this.cotRepo.query(
        "UPDATE mk_contacts SET status = ? WHERE id = ?",
        [newStatus, contactId],
      );
    } catch { /* ignore */ }

    // Map cotización estado → mk_lead_stages name for funnel sync
    const stageNameMap: Record<string, string> = {
      ENVIADA:   "Propuesta enviada",
      GENERADA:  "Propuesta enviada",
      ACEPTADA:  "Ganado",
      RECHAZADA: "Perdido",
    };
    const stageName = stageNameMap[cotEstado];
    if (!stageName) return;

    try {
      // Find the stage id
      const stageRows = await this.cotRepo.query(
        "SELECT id FROM mk_lead_stages WHERE name = ? LIMIT 1",
        [stageName],
      );
      const stageId = stageRows?.[0]?.id;
      if (!stageId) return;

      // Find the contact email to cross-reference mk_leads
      const contactRows = await this.cotRepo.query(
        "SELECT email FROM mk_contacts WHERE id = ? LIMIT 1",
        [contactId],
      );
      const email = contactRows?.[0]?.email;
      if (!email) return;

      // Update all mk_leads with matching email
      await this.cotRepo.query(
        "UPDATE mk_leads SET current_stage_id = ? WHERE email = ?",
        [stageId, email],
      );
    } catch { /* ignore if leads not found */ }
  }

  async create(dto: CreateCotizacionDto): Promise<Cotizacion> {
    const numero = await this.generateNumero();
    const detallesDto = dto.detalles ?? [];

    const descuento_pct = Number(dto.descuento_pct ?? 0);
    const impuesto_pct = Number(dto.impuesto_pct ?? 18);

    const normalizedDetalles = detallesDto.map((d) => ({
      ...d,
      descuento_pct: Number(d.descuento_pct ?? 0),
    }));
    const { subtotal, descuento_monto, impuesto_monto, total } = this.calcTotals(
      normalizedDetalles,
      descuento_pct,
      impuesto_pct,
    );

    const cot = this.cotRepo.create({
      numero,
      contact_id: dto.contact_id ?? null,
      empresa_id: dto.empresa_id ?? null,
      empresa_contacto_id: dto.empresa_contacto_id ?? null,
      titulo: dto.titulo,
      observaciones: dto.observaciones ?? null,
      terminos: dto.terminos ?? null,
      moneda: dto.moneda ?? "PEN",
      descuento_pct,
      descuento_monto,
      impuesto_pct,
      impuesto_monto,
      subtotal,
      total,
      estado: (dto.estado as any) ?? "BORRADOR",
      fecha_vigencia: dto.fecha_vigencia ?? null,
      created_by: dto.created_by ?? null,
    });

    const saved = await this.cotRepo.save(cot);

    if (detallesDto.length > 0) {
      const detalles = detallesDto.map((d, i) => {
        const linea = Number(d.cantidad) * Number(d.precio_unitario);
        const descLinea = linea * (Number(d.descuento_pct ?? 0) / 100);
        return this.detalleRepo.create({
          cotizacion_id: saved.id,
          descripcion: d.descripcion,
          cantidad: Number(d.cantidad),
          precio_unitario: Number(d.precio_unitario),
          descuento_pct: Number(d.descuento_pct ?? 0),
          subtotal: Number((linea - descLinea).toFixed(2)),
          orden: d.orden ?? i,
        });
      });
      await this.detalleRepo.save(detalles);
    }

    await this.syncContactStatus(dto.contact_id, "GENERADA");
    return this.findOne(saved.id);
  }

  async findAll(filters?: {
    estado?: string;
    contact_id?: number;
    q?: string;
    page?: number;
    pageSize?: number;
  }) {
    const page = filters?.page ?? 1;
    const pageSize = filters?.pageSize ?? 50;

    const qb = this.cotRepo
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.detalles", "d")
      .orderBy("c.id", "DESC")
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (filters?.estado) qb.andWhere("c.estado = :estado", { estado: filters.estado });
    if (filters?.contact_id) qb.andWhere("c.contact_id = :cid", { cid: filters.contact_id });
    if (filters?.q) {
      qb.andWhere("(c.titulo LIKE :q OR c.numero LIKE :q)", { q: `%${filters.q}%` });
    }

    const [items, total] = await qb.getManyAndCount();
    return { data: items, meta: { total, page, pageSize } };
  }

  async findOne(id: number): Promise<Cotizacion> {
    const c = await this.cotRepo.findOne({
      where: { id },
      relations: ["detalles", "envios"],
    });
    if (!c) throw new NotFoundException("Cotización no encontrada");
    return c;
  }

  async update(id: number, dto: UpdateCotizacionDto): Promise<Cotizacion> {
    const cot = await this.findOne(id);

    const detallesDto = dto.detalles;
    const descuento_pct = dto.descuento_pct !== undefined ? Number(dto.descuento_pct) : Number(cot.descuento_pct);
    const impuesto_pct = dto.impuesto_pct !== undefined ? Number(dto.impuesto_pct) : Number(cot.impuesto_pct);

    if (detallesDto !== undefined) {
      await this.detalleRepo.delete({ cotizacion_id: id });

      if (detallesDto.length > 0) {
        const normalizedDetalles2 = detallesDto.map((d) => ({
          ...d,
          descuento_pct: Number(d.descuento_pct ?? 0),
        }));
        const { subtotal, descuento_monto, impuesto_monto, total } = this.calcTotals(
          normalizedDetalles2,
          descuento_pct,
          impuesto_pct,
        );

        const nuevosDetalles = detallesDto.map((d, i) => {
          const linea = Number(d.cantidad) * Number(d.precio_unitario);
          const descLinea = linea * (Number(d.descuento_pct ?? 0) / 100);
          return this.detalleRepo.create({
            cotizacion_id: id,
            descripcion: d.descripcion,
            cantidad: Number(d.cantidad),
            precio_unitario: Number(d.precio_unitario),
            descuento_pct: Number(d.descuento_pct ?? 0),
            subtotal: Number((linea - descLinea).toFixed(2)),
            orden: d.orden ?? i,
          });
        });
        await this.detalleRepo.save(nuevosDetalles);

        Object.assign(cot, { subtotal, descuento_monto, impuesto_monto, total });
      }
    }

    const { detalles: _d, ...rest } = dto;
    if (rest.contact_id !== undefined) cot.contact_id = rest.contact_id ?? null;
    if (rest.empresa_id !== undefined) cot.empresa_id = rest.empresa_id ?? null;
    if (rest.empresa_contacto_id !== undefined) cot.empresa_contacto_id = rest.empresa_contacto_id ?? null;
    if (rest.titulo !== undefined) cot.titulo = rest.titulo;
    if (rest.observaciones !== undefined) cot.observaciones = rest.observaciones ?? null;
    if (rest.terminos !== undefined) cot.terminos = rest.terminos ?? null;
    if (rest.moneda !== undefined) cot.moneda = rest.moneda;
    if (rest.estado !== undefined) cot.estado = rest.estado as any;
    if (rest.fecha_vigencia !== undefined) cot.fecha_vigencia = rest.fecha_vigencia ?? null;
    if (rest.descuento_pct !== undefined) cot.descuento_pct = descuento_pct;
    if (rest.impuesto_pct !== undefined) cot.impuesto_pct = impuesto_pct;

    await this.cotRepo.save(cot);
    return this.findOne(id);
  }

  async cambiarEstado(id: number, dto: CambiarEstadoDto): Promise<Cotizacion> {
    const validStates = ["BORRADOR", "GENERADA", "ENVIADA", "ACEPTADA", "RECHAZADA", "VENCIDA"];
    if (!validStates.includes(dto.estado)) {
      throw new BadRequestException(`Estado inválido. Permitidos: ${validStates.join(", ")}`);
    }
    const cot = await this.findOne(id);
    cot.estado = dto.estado as any;
    await this.cotRepo.save(cot);
    await this.syncContactStatus(cot.contact_id, dto.estado);
    return this.findOne(id);
  }

  async remove(id: number) {
    const cot = await this.findOne(id);
    await this.cotRepo.remove(cot);
    return { ok: true };
  }

  // ─── PDF ─────────────────────────────────────────────────────────────────────

  async generatePdf(id: number, empresaRepo: any): Promise<Buffer> {
    const cot = await this.cotRepo.findOne({
      where: { id },
      relations: ["detalles"],
    });
    if (!cot) throw new NotFoundException("Cotización no encontrada");

    const empresa = await empresaRepo.findOne({ where: { id: 1 } });

    let contact: any = null;
    if (cot.empresa_id) {
      // Build contact info from empresa + contacto
      try {
        const empRows = await this.cotRepo.query(
          "SELECT type, razon_social, nombre_comercial, nombre_completo, documento_id, email, telefono, ruc, direccion FROM mk_empresa_cliente WHERE id = ?",
          [cot.empresa_id],
        );
        const emp = empRows?.[0];
        if (emp) {
          if (emp.type === "persona") {
            contact = {
              full_name: emp.nombre_completo,
              email: emp.email,
              phone: emp.telefono,
              company: emp.documento_id ? `DNI/Doc: ${emp.documento_id}` : null,
            };
          } else {
            contact = {
              full_name: emp.nombre_comercial || emp.razon_social,
              email: emp.email,
              phone: emp.telefono,
              company: emp.razon_social + (emp.ruc ? ` | RUC: ${emp.ruc}` : ""),
            };
          }
          // Override with specific contacto if set
          if (cot.empresa_contacto_id) {
            const ctRows = await this.cotRepo.query(
              "SELECT nombres, apellidos, cargo, correo, telefono FROM mk_empresa_contacto WHERE id = ?",
              [cot.empresa_contacto_id],
            );
            const ct = ctRows?.[0];
            if (ct) {
              contact.full_name = [ct.nombres, ct.apellidos].filter(Boolean).join(" ");
              if (ct.correo) contact.email = ct.correo;
              if (ct.telefono) contact.phone = ct.telefono;
              if (ct.cargo) contact.company = `${contact.company} — ${ct.cargo}`;
            }
          }
        }
      } catch {
        contact = null;
      }
    } else if (cot.contact_id) {
      try {
        const result = await this.cotRepo.query(
          "SELECT id, full_name, email, phone, company FROM mk_contacts WHERE id = ?",
          [cot.contact_id],
        );
        contact = result?.[0] ?? null;
      } catch {
        contact = null;
      }
    }

    // Mark as GENERADA if still BORRADOR
    if (cot.estado === "BORRADOR") {
      cot.estado = "GENERADA";
      await this.cotRepo.save(cot);
    }

    return this.pdfService.generateCotizacionPdf(
      cot,
      cot.detalles ?? [],
      {
        nombre: empresa?.nombre ?? "MBS",
        ruc: empresa?.ruc ?? null,
        direccion: empresa?.direccion ?? null,
        telefono: empresa?.telefono ?? null,
        email: empresa?.email ?? null,
        website: empresa?.website ?? null,
        logo_base64: empresa?.logo_base64 ?? null,
        terminos: empresa?.terminos ?? null,
      },
      contact,
    );
  }

  // ─── ENVÍO ───────────────────────────────────────────────────────────────────

  async enviar(id: number, dto: SendCotizacionDto, empresaRepo: any): Promise<CotizacionEnvio> {
    const cot = await this.cotRepo.findOne({
      where: { id },
      relations: ["detalles"],
    });
    if (!cot) throw new NotFoundException("Cotización no encontrada");

    const empresa = await empresaRepo.findOne({ where: { id: 1 } });

    // Generar PDF
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await this.generatePdf(id, empresaRepo);
    } catch (err: any) {
      // continue without PDF attachment if generation fails
    }

    // Obtener contact name
    let contactName = "Cliente";
    if (cot.empresa_id) {
      try {
        const empRows = await this.cotRepo.query(
          "SELECT type, razon_social, nombre_comercial, nombre_completo FROM mk_empresa_cliente WHERE id = ?",
          [cot.empresa_id],
        );
        const emp = empRows?.[0];
        if (emp?.type === "persona") {
          contactName = emp.nombre_completo || "Cliente";
        } else {
          contactName = emp?.nombre_comercial || emp?.razon_social || "Cliente";
        }
        if (cot.empresa_contacto_id) {
          const ctRows = await this.cotRepo.query(
            "SELECT nombres, apellidos FROM mk_empresa_contacto WHERE id = ?",
            [cot.empresa_contacto_id],
          );
          const ct = ctRows?.[0];
          if (ct) contactName = [ct.nombres, ct.apellidos].filter(Boolean).join(" ");
        }
      } catch { /* */ }
    } else if (cot.contact_id) {
      try {
        const result = await this.cotRepo.query(
          "SELECT full_name FROM mk_contacts WHERE id = ?",
          [cot.contact_id],
        );
        contactName = result?.[0]?.full_name ?? "Cliente";
      } catch {
        //
      }
    }

    const asunto = dto.asunto || `Cotización ${cot.numero} - ${empresa?.nombre ?? "MBS"}`;

    const html = this.emailService.buildCotizacionHtml({
      empresaNombre: empresa?.nombre ?? "MBS",
      cotizacionNumero: cot.numero,
      clienteNombre: contactName,
      mensaje: dto.mensaje ?? "",
      total: Number(cot.total).toFixed(2),
      moneda: cot.moneda,
      fechaVigencia: cot.fecha_vigencia
        ? new Date(cot.fecha_vigencia).toLocaleDateString("es-PE")
        : "No especificada",
    });

    const smtpConfig = empresa?.smtp_host
      ? {
          host: empresa.smtp_host,
          port: empresa.smtp_port ?? 587,
          user: empresa.smtp_user ?? "",
          pass: empresa.smtp_pass ?? "",
          from: empresa.smtp_from ?? empresa.email ?? "",
        }
      : null;

    const emailResult = await this.emailService.sendEmail(smtpConfig, {
      to: dto.email_destino,
      subject: asunto,
      html,
      attachments: pdfBuffer
        ? [{ filename: `${cot.numero}.pdf`, content: pdfBuffer, contentType: "application/pdf" }]
        : [],
    });

    const envio = this.envioRepo.create({
      cotizacion_id: id,
      email_destino: dto.email_destino,
      asunto,
      mensaje: dto.mensaje ?? null,
      enviado_por: dto.enviado_por ?? null,
      resultado: emailResult.ok ? "SUCCESS" : "ERROR",
      error_msg: emailResult.error ?? null,
    });

    const savedEnvio = await this.envioRepo.save(envio);

    // Actualizar estado cotización
    if (emailResult.ok) {
      cot.estado = "ENVIADA";
      await this.cotRepo.save(cot);
      await this.syncContactStatus(cot.contact_id, "ENVIADA");
    }

    return savedEnvio;
  }

  async getEnvios(id: number): Promise<CotizacionEnvio[]> {
    return this.envioRepo.find({
      where: { cotizacion_id: id },
      order: { enviado_at: "DESC" },
    });
  }
}
