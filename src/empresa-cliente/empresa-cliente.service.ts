import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmpresaCliente } from "./EmpresaCliente";
import { EmpresaContacto } from "./EmpresaContacto";
import { CreateEmpresaClienteDto } from "./dto/create-empresa-cliente.dto";
import { CreateEmpresaContactoDto } from "./dto/create-empresa-contacto.dto";

@Injectable()
export class EmpresaClienteService {
  constructor(
    @InjectRepository(EmpresaCliente)
    private readonly empresaRepo: Repository<EmpresaCliente>,
    @InjectRepository(EmpresaContacto)
    private readonly contactoRepo: Repository<EmpresaContacto>,
  ) {}

  // ── Empresas ──────────────────────────────────────────────────────────────

  async findAllEmpresas(
    q?: string,
    type?: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: EmpresaCliente[]; total: number; page: number; totalPages: number }> {
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

  async findOneEmpresa(id: number): Promise<EmpresaCliente> {
    const e = await this.empresaRepo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("Empresa no encontrada");
    return e;
  }

  async createEmpresa(dto: CreateEmpresaClienteDto): Promise<EmpresaCliente> {
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

  async updateEmpresa(id: number, dto: Partial<CreateEmpresaClienteDto>): Promise<EmpresaCliente> {
    const e = await this.findOneEmpresa(id);
    Object.assign(e, dto);
    return this.empresaRepo.save(e);
  }

  async removeEmpresa(id: number): Promise<{ ok: boolean }> {
    const e = await this.findOneEmpresa(id);
    await this.empresaRepo.remove(e);
    return { ok: true };
  }

  // ── Contactos de empresa ─────────────────────────────────────────────────

  async findContactosByEmpresa(empresaId: number): Promise<EmpresaContacto[]> {
    return this.contactoRepo.find({
      where: { empresa_id: empresaId },
      order: { is_principal: "DESC", nombres: "ASC" },
    });
  }

  async createContacto(dto: CreateEmpresaContactoDto): Promise<EmpresaContacto> {
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

  async updateContacto(id: number, dto: Partial<CreateEmpresaContactoDto>): Promise<EmpresaContacto> {
    const c = await this.contactoRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Contacto no encontrado");
    if (dto.nombres !== undefined) c.nombres = dto.nombres;
    if (dto.apellidos !== undefined) c.apellidos = dto.apellidos ?? null;
    if (dto.cargo !== undefined) c.cargo = dto.cargo ?? null;
    if (dto.correo !== undefined) c.correo = dto.correo ?? null;
    if (dto.telefono !== undefined) c.telefono = dto.telefono ?? null;
    if (dto.estado !== undefined) c.estado = dto.estado ?? "activo";
    if (dto.is_principal !== undefined) c.is_principal = dto.is_principal ? 1 : 0;
    return this.contactoRepo.save(c);
  }

  async removeContacto(id: number): Promise<{ ok: boolean }> {
    const c = await this.contactoRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Contacto no encontrado");
    await this.contactoRepo.remove(c);
    return { ok: true };
  }
}
