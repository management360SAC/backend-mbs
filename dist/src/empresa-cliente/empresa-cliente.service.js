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
exports.EmpresaClienteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const EmpresaCliente_1 = require("./EmpresaCliente");
const EmpresaContacto_1 = require("./EmpresaContacto");
let EmpresaClienteService = class EmpresaClienteService {
    empresaRepo;
    contactoRepo;
    constructor(empresaRepo, contactoRepo) {
        this.empresaRepo = empresaRepo;
        this.contactoRepo = contactoRepo;
    }
    async findAllEmpresas(q, type, page = 1, limit = 10) {
        const qb = this.empresaRepo.createQueryBuilder("e");
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
        const e = await this.empresaRepo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException("Empresa no encontrada");
        return e;
    }
    async createEmpresa(dto) {
        const e = this.empresaRepo.create({
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
        return this.empresaRepo.save(e);
    }
    async updateEmpresa(id, dto) {
        const e = await this.findOneEmpresa(id);
        Object.assign(e, dto);
        return this.empresaRepo.save(e);
    }
    async removeEmpresa(id) {
        const e = await this.findOneEmpresa(id);
        await this.empresaRepo.remove(e);
        return { ok: true };
    }
    async findContactosByEmpresa(empresaId) {
        return this.contactoRepo.find({
            where: { empresa_id: empresaId },
            order: { is_principal: "DESC", nombres: "ASC" },
        });
    }
    async createContacto(dto) {
        await this.findOneEmpresa(dto.empresa_id);
        const c = this.contactoRepo.create({
            empresa_id: dto.empresa_id,
            nombres: dto.nombres,
            apellidos: dto.apellidos ?? null,
            cargo: dto.cargo ?? null,
            correo: dto.correo ?? null,
            telefono: dto.telefono ?? null,
            estado: dto.estado ?? "activo",
            is_principal: dto.is_principal ? 1 : 0,
        });
        return this.contactoRepo.save(c);
    }
    async updateContacto(id, dto) {
        const c = await this.contactoRepo.findOne({ where: { id } });
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
        return this.contactoRepo.save(c);
    }
    async removeContacto(id) {
        const c = await this.contactoRepo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException("Contacto no encontrado");
        await this.contactoRepo.remove(c);
        return { ok: true };
    }
};
exports.EmpresaClienteService = EmpresaClienteService;
exports.EmpresaClienteService = EmpresaClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmpresaCliente_1.EmpresaCliente)),
    __param(1, (0, typeorm_1.InjectRepository)(EmpresaContacto_1.EmpresaContacto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EmpresaClienteService);
//# sourceMappingURL=empresa-cliente.service.js.map