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
exports.CotizacionesService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const Cotizacion_1 = require("./Cotizacion");
const CotizacionDetalle_1 = require("./CotizacionDetalle");
const CotizacionEnvio_1 = require("./CotizacionEnvio");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
const pdf_service_1 = require("./pdf.service");
const email_service_1 = require("./email.service");
let CotizacionesService = class CotizacionesService {
    tds;
    pdfService;
    emailService;
    constructor(tds, pdfService, emailService) {
        this.tds = tds;
        this.pdfService = pdfService;
        this.emailService = emailService;
    }
    async generateNumero() {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const year = new Date().getFullYear();
        const count = await cotRepo.count();
        const seq = String(count + 1).padStart(4, "0");
        return `COT-${year}-${seq}`;
    }
    calcTotals(detalles, descuento_pct, impuesto_pct) {
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
    async syncContactStatus(contactId, cotEstado) {
        if (!contactId)
            return;
        const statusMap = {
            ENVIADA: "proposal_sent",
            GENERADA: "proposal_sent",
            ACEPTADA: "won",
            RECHAZADA: "lost",
        };
        const newStatus = statusMap[cotEstado];
        if (!newStatus)
            return;
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        try {
            await cotRepo.query("UPDATE mk_contacts SET status = ? WHERE id = ?", [newStatus, contactId]);
        }
        catch { }
        const stageNameMap = {
            ENVIADA: "Propuesta enviada",
            GENERADA: "Propuesta enviada",
            ACEPTADA: "Ganado",
            RECHAZADA: "Perdido",
        };
        const stageName = stageNameMap[cotEstado];
        if (!stageName)
            return;
        try {
            const stageRows = await cotRepo.query("SELECT id FROM mk_lead_stages WHERE name = ? LIMIT 1", [stageName]);
            const stageId = stageRows?.[0]?.id;
            if (!stageId)
                return;
            const contactRows = await cotRepo.query("SELECT email FROM mk_contacts WHERE id = ? LIMIT 1", [contactId]);
            const email = contactRows?.[0]?.email;
            if (!email)
                return;
            await cotRepo.query("UPDATE mk_leads SET current_stage_id = ? WHERE email = ?", [stageId, email]);
        }
        catch { }
    }
    async create(dto) {
        const numero = await this.generateNumero();
        const detallesDto = dto.detalles ?? [];
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const detalleRepo = await this.tds.getRepository(CotizacionDetalle_1.CotizacionDetalle);
        const descuento_pct = Number(dto.descuento_pct ?? 0);
        const impuesto_pct = Number(dto.impuesto_pct ?? 18);
        const normalizedDetalles = detallesDto.map((d) => ({
            ...d,
            descuento_pct: Number(d.descuento_pct ?? 0),
        }));
        const { subtotal, descuento_monto, impuesto_monto, total } = this.calcTotals(normalizedDetalles, descuento_pct, impuesto_pct);
        const cot = cotRepo.create({
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
            estado: dto.estado ?? "BORRADOR",
            fecha_vigencia: dto.fecha_vigencia ?? null,
            created_by: dto.created_by ?? null,
        });
        const saved = await cotRepo.save(cot);
        if (detallesDto.length > 0) {
            const detalles = detallesDto.map((d, i) => {
                const linea = Number(d.cantidad) * Number(d.precio_unitario);
                const descLinea = linea * (Number(d.descuento_pct ?? 0) / 100);
                return detalleRepo.create({
                    cotizacion_id: saved.id,
                    descripcion: d.descripcion,
                    cantidad: Number(d.cantidad),
                    precio_unitario: Number(d.precio_unitario),
                    descuento_pct: Number(d.descuento_pct ?? 0),
                    subtotal: Number((linea - descLinea).toFixed(2)),
                    orden: d.orden ?? i,
                });
            });
            await detalleRepo.save(detalles);
        }
        await this.syncContactStatus(dto.contact_id, "GENERADA");
        return this.findOne(saved.id);
    }
    async findAll(filters) {
        const page = filters?.page ?? 1;
        const pageSize = filters?.pageSize ?? 50;
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const qb = cotRepo
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.detalles", "d")
            .orderBy("c.id", "DESC")
            .skip((page - 1) * pageSize)
            .take(pageSize);
        if (filters?.estado)
            qb.andWhere("c.estado = :estado", { estado: filters.estado });
        if (filters?.contact_id)
            qb.andWhere("c.contact_id = :cid", { cid: filters.contact_id });
        if (filters?.q) {
            qb.andWhere("(c.titulo LIKE :q OR c.numero LIKE :q)", { q: `%${filters.q}%` });
        }
        const [items, total] = await qb.getManyAndCount();
        return { data: items, meta: { total, page, pageSize } };
    }
    async findOne(id) {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const c = await cotRepo.findOne({
            where: { id },
            relations: ["detalles", "envios"],
        });
        if (!c)
            throw new common_1.NotFoundException("Cotización no encontrada");
        return c;
    }
    async update(id, dto) {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const detalleRepo = await this.tds.getRepository(CotizacionDetalle_1.CotizacionDetalle);
        const cot = await this.findOne(id);
        const detallesDto = dto.detalles;
        const descuento_pct = dto.descuento_pct !== undefined ? Number(dto.descuento_pct) : Number(cot.descuento_pct);
        const impuesto_pct = dto.impuesto_pct !== undefined ? Number(dto.impuesto_pct) : Number(cot.impuesto_pct);
        if (detallesDto !== undefined) {
            await detalleRepo.delete({ cotizacion_id: id });
            if (detallesDto.length > 0) {
                const normalizedDetalles2 = detallesDto.map((d) => ({
                    ...d,
                    descuento_pct: Number(d.descuento_pct ?? 0),
                }));
                const { subtotal, descuento_monto, impuesto_monto, total } = this.calcTotals(normalizedDetalles2, descuento_pct, impuesto_pct);
                const nuevosDetalles = detallesDto.map((d, i) => {
                    const linea = Number(d.cantidad) * Number(d.precio_unitario);
                    const descLinea = linea * (Number(d.descuento_pct ?? 0) / 100);
                    return detalleRepo.create({
                        cotizacion_id: id,
                        descripcion: d.descripcion,
                        cantidad: Number(d.cantidad),
                        precio_unitario: Number(d.precio_unitario),
                        descuento_pct: Number(d.descuento_pct ?? 0),
                        subtotal: Number((linea - descLinea).toFixed(2)),
                        orden: d.orden ?? i,
                    });
                });
                await detalleRepo.save(nuevosDetalles);
                Object.assign(cot, { subtotal, descuento_monto, impuesto_monto, total });
            }
        }
        const { detalles: _d, ...rest } = dto;
        if (rest.contact_id !== undefined)
            cot.contact_id = rest.contact_id ?? null;
        if (rest.empresa_id !== undefined)
            cot.empresa_id = rest.empresa_id ?? null;
        if (rest.empresa_contacto_id !== undefined)
            cot.empresa_contacto_id = rest.empresa_contacto_id ?? null;
        if (rest.titulo !== undefined)
            cot.titulo = rest.titulo;
        if (rest.observaciones !== undefined)
            cot.observaciones = rest.observaciones ?? null;
        if (rest.terminos !== undefined)
            cot.terminos = rest.terminos ?? null;
        if (rest.moneda !== undefined)
            cot.moneda = rest.moneda;
        if (rest.estado !== undefined)
            cot.estado = rest.estado;
        if (rest.fecha_vigencia !== undefined)
            cot.fecha_vigencia = rest.fecha_vigencia ?? null;
        if (rest.descuento_pct !== undefined)
            cot.descuento_pct = descuento_pct;
        if (rest.impuesto_pct !== undefined)
            cot.impuesto_pct = impuesto_pct;
        await cotRepo.save(cot);
        return this.findOne(id);
    }
    async cambiarEstado(id, dto) {
        const validStates = ["BORRADOR", "GENERADA", "ENVIADA", "ACEPTADA", "RECHAZADA", "VENCIDA"];
        if (!validStates.includes(dto.estado)) {
            throw new common_1.BadRequestException(`Estado inválido. Permitidos: ${validStates.join(", ")}`);
        }
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const cot = await this.findOne(id);
        cot.estado = dto.estado;
        await cotRepo.save(cot);
        await this.syncContactStatus(cot.contact_id, dto.estado);
        return this.findOne(id);
    }
    async remove(id) {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const cot = await this.findOne(id);
        await cotRepo.remove(cot);
        return { ok: true };
    }
    async generatePdf(id) {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const configRepo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
        const cot = await cotRepo.findOne({ where: { id }, relations: ["detalles"] });
        if (!cot)
            throw new common_1.NotFoundException("Cotización no encontrada");
        const empresa = await configRepo.findOne({ where: { id: 1 } });
        let contact = null;
        if (cot.empresa_id) {
            try {
                const empRows = await cotRepo.query("SELECT type, razon_social, nombre_comercial, nombre_completo, documento_id, email, telefono, ruc, direccion FROM mk_empresa_cliente WHERE id = ?", [cot.empresa_id]);
                const emp = empRows?.[0];
                if (emp) {
                    if (emp.type === "persona") {
                        contact = {
                            full_name: emp.nombre_completo,
                            email: emp.email,
                            phone: emp.telefono,
                            company: emp.documento_id ? `DNI/Doc: ${emp.documento_id}` : null,
                        };
                    }
                    else {
                        contact = {
                            full_name: emp.nombre_comercial || emp.razon_social,
                            email: emp.email,
                            phone: emp.telefono,
                            company: emp.razon_social + (emp.ruc ? ` | RUC: ${emp.ruc}` : ""),
                        };
                    }
                    if (cot.empresa_contacto_id) {
                        const ctRows = await cotRepo.query("SELECT nombres, apellidos, cargo, correo, telefono FROM mk_empresa_contacto WHERE id = ?", [cot.empresa_contacto_id]);
                        const ct = ctRows?.[0];
                        if (ct) {
                            contact.full_name = [ct.nombres, ct.apellidos].filter(Boolean).join(" ");
                            if (ct.correo)
                                contact.email = ct.correo;
                            if (ct.telefono)
                                contact.phone = ct.telefono;
                            if (ct.cargo)
                                contact.company = `${contact.company} — ${ct.cargo}`;
                        }
                    }
                }
            }
            catch {
                contact = null;
            }
        }
        else if (cot.contact_id) {
            try {
                const result = await cotRepo.query("SELECT id, full_name, email, phone, company FROM mk_contacts WHERE id = ?", [cot.contact_id]);
                contact = result?.[0] ?? null;
            }
            catch {
                contact = null;
            }
        }
        if (cot.estado === "BORRADOR") {
            cot.estado = "GENERADA";
            await cotRepo.save(cot);
        }
        return this.pdfService.generateCotizacionPdf(cot, cot.detalles ?? [], {
            nombre: empresa?.nombre ?? "MBS",
            ruc: empresa?.ruc ?? null,
            direccion: empresa?.direccion ?? null,
            telefono: empresa?.telefono ?? null,
            email: empresa?.email ?? null,
            website: empresa?.website ?? null,
            logo_base64: empresa?.logo_base64 ?? null,
            terminos: empresa?.terminos ?? null,
        }, contact);
    }
    async enviar(id, dto) {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const envioRepo = await this.tds.getRepository(CotizacionEnvio_1.CotizacionEnvio);
        const configRepo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
        const cot = await cotRepo.findOne({ where: { id }, relations: ["detalles"] });
        if (!cot)
            throw new common_1.NotFoundException("Cotización no encontrada");
        const empresa = await configRepo.findOne({ where: { id: 1 } });
        let pdfBuffer = null;
        try {
            pdfBuffer = await this.generatePdf(id);
        }
        catch {
        }
        let contactName = "Cliente";
        if (cot.empresa_id) {
            try {
                const empRows = await cotRepo.query("SELECT type, razon_social, nombre_comercial, nombre_completo FROM mk_empresa_cliente WHERE id = ?", [cot.empresa_id]);
                const emp = empRows?.[0];
                if (emp?.type === "persona") {
                    contactName = emp.nombre_completo || "Cliente";
                }
                else {
                    contactName = emp?.nombre_comercial || emp?.razon_social || "Cliente";
                }
                if (cot.empresa_contacto_id) {
                    const ctRows = await cotRepo.query("SELECT nombres, apellidos FROM mk_empresa_contacto WHERE id = ?", [cot.empresa_contacto_id]);
                    const ct = ctRows?.[0];
                    if (ct)
                        contactName = [ct.nombres, ct.apellidos].filter(Boolean).join(" ");
                }
            }
            catch { }
        }
        else if (cot.contact_id) {
            try {
                const result = await cotRepo.query("SELECT full_name FROM mk_contacts WHERE id = ?", [cot.contact_id]);
                contactName = result?.[0]?.full_name ?? "Cliente";
            }
            catch { }
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
        const envio = envioRepo.create({
            cotizacion_id: id,
            email_destino: dto.email_destino,
            asunto,
            mensaje: dto.mensaje ?? null,
            enviado_por: dto.enviado_por ?? null,
            resultado: emailResult.ok ? "SUCCESS" : "ERROR",
            error_msg: emailResult.error ?? null,
        });
        const savedEnvio = await envioRepo.save(envio);
        if (emailResult.ok) {
            cot.estado = "ENVIADA";
            await cotRepo.save(cot);
            await this.syncContactStatus(cot.contact_id, "ENVIADA");
        }
        return savedEnvio;
    }
    async emailManual(id, dto) {
        const cotRepo = await this.tds.getRepository(Cotizacion_1.Cotizacion);
        const envioRepo = await this.tds.getRepository(CotizacionEnvio_1.CotizacionEnvio);
        const configRepo = await this.tds.getRepository(EmpresaConfig_1.EmpresaConfig);
        const cot = await cotRepo.findOne({ where: { id } });
        if (!cot)
            throw new common_1.NotFoundException("Cotización no encontrada");
        const empresa = await configRepo.findOne({ where: { id: 1 } });
        const smtpConfig = empresa?.smtp_host
            ? {
                host: empresa.smtp_host,
                port: empresa.smtp_port ?? 587,
                user: empresa.smtp_user ?? "",
                pass: empresa.smtp_pass ?? "",
                from: empresa.smtp_from ?? empresa.email ?? "",
            }
            : null;
        const html = `
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:20px}
  .container{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:#2563eb;padding:28px 40px}
  .header h1{color:#fff;margin:0;font-size:20px;font-weight:700}
  .body{padding:32px 40px;color:#374151;line-height:1.7;white-space:pre-wrap}
  .footer{padding:16px 40px;background:#f1f5f9;font-size:12px;color:#64748b}
</style></head><body>
<div class="container">
  <div class="header"><h1>${empresa?.nombre ?? "MBS"}</h1></div>
  <div class="body">${dto.cuerpo.replace(/\n/g, "<br/>")}</div>
  <div class="footer">Cotización referencia: ${cot.numero}</div>
</div></body></html>`.trim();
        const emailResult = await this.emailService.sendEmail(smtpConfig, {
            to: dto.email_destino,
            subject: dto.asunto,
            html,
        });
        const envio = envioRepo.create({
            cotizacion_id: id,
            email_destino: dto.email_destino,
            asunto: dto.asunto,
            mensaje: dto.cuerpo,
            resultado: emailResult.ok ? "SUCCESS" : "ERROR",
            error_msg: emailResult.error ?? null,
        });
        return envioRepo.save(envio);
    }
    async getEnvios(id) {
        const envioRepo = await this.tds.getRepository(CotizacionEnvio_1.CotizacionEnvio);
        return envioRepo.find({
            where: { cotizacion_id: id },
            order: { enviado_at: "DESC" },
        });
    }
};
exports.CotizacionesService = CotizacionesService;
exports.CotizacionesService = CotizacionesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService,
        pdf_service_1.PdfService,
        email_service_1.EmailService])
], CotizacionesService);
//# sourceMappingURL=cotizaciones.service.js.map