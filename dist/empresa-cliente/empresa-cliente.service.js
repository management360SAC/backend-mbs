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
exports.EmpresaClienteService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const EmpresaCliente_1 = require("./EmpresaCliente");
const EmpresaContacto_1 = require("./EmpresaContacto");
let EmpresaClienteService = class EmpresaClienteService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async findAllEmpresas(q, type, page = 1, limit = 10) {
        const repo = await this.tds.getRepository(EmpresaCliente_1.EmpresaCliente);
        const qb = repo.createQueryBuilder("e");
        if (type) {
            qb.where("e.type = :type", { type });
        }
        if (q) {
            const clause = "(e.razon_social LIKE :q OR e.nombre_comercial LIKE :q OR e.ruc LIKE :q OR e.nombre_completo LIKE :q OR e.documento_id LIKE :q)";
            type ? qb.andWhere(clause, { q: `%${q}%` }) : qb.where(clause, { q: `%${q}%` });
        }
        qb.orderBy("COALESCE(e.razon_social, e.nombre_completo)", "ASC");
        const total = await qb.getCount();
        const data = await qb.skip((page - 1) * limit).take(limit).getMany();
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    }
    async findOneEmpresa(id) {
        const repo = await this.tds.getRepository(EmpresaCliente_1.EmpresaCliente);
        const e = await repo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException("Empresa no encontrada");
        return e;
    }
    async createEmpresa(dto) {
        const repo = await this.tds.getRepository(EmpresaCliente_1.EmpresaCliente);
        const e = repo.create({
            type: dto.type ?? "empresa",
            razon_social: dto.razon_social ?? null,
            nombre_comercial: dto.nombre_comercial ?? null,
            ruc: dto.ruc ?? null,
            nombre_completo: dto.nombre_completo ?? null,
            documento_id: dto.documento_id ?? null,
            direccion: dto.direccion ?? null,
            telefono: dto.telefono ?? null,
            email: dto.email ?? null,
            estado: dto.estado ?? "activo",
            observaciones: dto.observaciones ?? null,
        });
        return repo.save(e);
    }
    async updateEmpresa(id, dto) {
        const repo = await this.tds.getRepository(EmpresaCliente_1.EmpresaCliente);
        const e = await this.findOneEmpresa(id);
        Object.assign(e, dto);
        return repo.save(e);
    }
    async removeEmpresa(id) {
        const repo = await this.tds.getRepository(EmpresaCliente_1.EmpresaCliente);
        const e = await this.findOneEmpresa(id);
        await repo.remove(e);
        return { ok: true };
    }
    async findContactosByEmpresa(empresaId) {
        const repo = await this.tds.getRepository(EmpresaContacto_1.EmpresaContacto);
        return repo.find({
            where: { empresa_id: empresaId },
            order: { is_principal: "DESC", nombres: "ASC" },
        });
    }
    async createContacto(dto) {
        await this.findOneEmpresa(dto.empresa_id);
        const repo = await this.tds.getRepository(EmpresaContacto_1.EmpresaContacto);
        const c = repo.create({
            empresa_id: dto.empresa_id,
            nombres: dto.nombres,
            apellidos: dto.apellidos ?? null,
            cargo: dto.cargo ?? null,
            correo: dto.correo ?? null,
            telefono: dto.telefono ?? null,
            estado: dto.estado ?? "activo",
            is_principal: dto.is_principal ? 1 : 0,
        });
        return repo.save(c);
    }
    async updateContacto(id, dto) {
        const repo = await this.tds.getRepository(EmpresaContacto_1.EmpresaContacto);
        const c = await repo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException("Contacto no encontrado");
        if (dto.nombres !== undefined)
            c.nombres = dto.nombres;
        if (dto.apellidos !== undefined)
            c.apellidos = dto.apellidos ?? null;
        if (dto.cargo !== undefined)
            c.cargo = dto.cargo ?? null;
        if (dto.correo !== undefined)
            c.correo = dto.correo ?? null;
        if (dto.telefono !== undefined)
            c.telefono = dto.telefono ?? null;
        if (dto.estado !== undefined)
            c.estado = dto.estado ?? "activo";
        if (dto.is_principal !== undefined)
            c.is_principal = dto.is_principal ? 1 : 0;
        return repo.save(c);
    }
    async removeContacto(id) {
        const repo = await this.tds.getRepository(EmpresaContacto_1.EmpresaContacto);
        const c = await repo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException("Contacto no encontrado");
        await repo.remove(c);
        return { ok: true };
    }
};
exports.EmpresaClienteService = EmpresaClienteService;
exports.EmpresaClienteService = EmpresaClienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], EmpresaClienteService);
//# sourceMappingURL=empresa-cliente.service.js.map