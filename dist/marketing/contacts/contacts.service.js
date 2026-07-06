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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Contact_1 = require("./Contact");
const VALID_STATUSES = ["new", "contacted", "qualified", "nurturing", "proposal_sent", "won", "lost"];
let ContactsService = class ContactsService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(Contact_1.Contact);
        return repo.save(repo.create(dto));
    }
    async findAll(filters) {
        const repo = await this.tds.getRepository(Contact_1.Contact);
        const qb = repo.createQueryBuilder("c");
        if (filters?.type)
            qb.andWhere("c.type = :type", { type: filters.type });
        if (filters?.status)
            qb.andWhere("c.status = :status", { status: filters.status });
        if (filters?.source_id)
            qb.andWhere("c.source_id = :source_id", { source_id: filters.source_id });
        if (filters?.q) {
            qb.andWhere("(c.full_name LIKE :q OR c.email LIKE :q OR c.phone LIKE :q)", { q: `%${filters.q}%` });
        }
        qb.orderBy("c.id", "DESC");
        const page = filters?.page ?? 1;
        const limit = filters?.limit ?? 10000;
        qb.skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(id) {
        const repo = await this.tds.getRepository(Contact_1.Contact);
        const e = await repo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException("Contacto no encontrado");
        return e;
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Contact_1.Contact);
        const e = await this.findOne(id);
        Object.assign(e, dto);
        return repo.save(e);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(Contact_1.Contact);
        const e = await this.findOne(id);
        await repo.remove(e);
        return { ok: true };
    }
    async importContacts(buffer) {
        const XLSX = require("xlsx");
        let wb;
        try {
            wb = XLSX.read(buffer, { type: "buffer" });
        }
        catch {
            throw new common_1.BadRequestException("No se pudo leer el archivo. Asegúrate de subir un .xlsx o .csv válido.");
        }
        const ws = wb.Sheets[wb.SheetNames[0]];
        if (!ws)
            throw new common_1.BadRequestException("El archivo no contiene hojas de datos.");
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
        if (rows.length === 0)
            throw new common_1.BadRequestException("El archivo no contiene filas de datos.");
        const repo = await this.tds.getRepository(Contact_1.Contact);
        const errors = [];
        let created = 0;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const nombre = String(row.nombre ?? row.Nombre ?? row.full_name ?? row["Nombre"] ?? "").trim();
            if (!nombre) {
                errors.push({ row: i + 2, reason: "El campo 'nombre' es requerido" });
                continue;
            }
            const rawStatus = String(row.estado ?? row.status ?? "new").trim().toLowerCase();
            const status = VALID_STATUSES.includes(rawStatus) ? rawStatus : "new";
            const email = String(row.email ?? row.Email ?? "").trim() || null;
            const phone = String(row.telefono ?? row.Telefono ?? row.phone ?? "").trim() || null;
            const company = String(row.empresa ?? row.Empresa ?? row.company ?? "").trim() || null;
            const city = String(row.ciudad ?? row.Ciudad ?? row.city ?? "").trim() || null;
            const country = String(row.pais ?? row.Pais ?? row.country ?? "").trim() || null;
            try {
                await repo.save(repo.create({
                    type: "lead",
                    full_name: nombre,
                    email,
                    phone,
                    company,
                    status: status,
                    city,
                    country,
                }));
                created++;
            }
            catch (e) {
                errors.push({ row: i + 2, reason: e.message ?? "Error desconocido" });
            }
        }
        return { created, errors };
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map