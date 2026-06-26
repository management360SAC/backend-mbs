import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { EmpresaCliente } from "./EmpresaCliente";
import { EmpresaContacto } from "./EmpresaContacto";
import { CreateEmpresaClienteDto } from "./dto/create-empresa-cliente.dto";
import { CreateEmpresaContactoDto } from "./dto/create-empresa-contacto.dto";

@Injectable()
export class EmpresaClienteService {
  constructor(private readonly tds: TenantDataSourceService) {}

  // ── Empresas ──────────────────────────────────────────────────────────────

  async findAllEmpresas(
    q?: string,
    type?: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: EmpresaCliente[]; total: number; page: number; totalPages: number }> {
    const repo = await this.tds.getRepository(EmpresaCliente);
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

  async findOneEmpresa(id: number): Promise<EmpresaCliente> {
    const repo = await this.tds.getRepository(EmpresaCliente);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("Empresa no encontrada");
    return e;
  }

  async createEmpresa(dto: CreateEmpresaClienteDto): Promise<EmpresaCliente> {
    const repo = await this.tds.getRepository(EmpresaCliente);
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

  async updateEmpresa(id: number, dto: Partial<CreateEmpresaClienteDto>): Promise<EmpresaCliente> {
    const repo = await this.tds.getRepository(EmpresaCliente);
    const e = await this.findOneEmpresa(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async removeEmpresa(id: number): Promise<{ ok: boolean }> {
    const repo = await this.tds.getRepository(EmpresaCliente);
    const e = await this.findOneEmpresa(id);
    await repo.remove(e);
    return { ok: true };
  }

  // ── Contactos de empresa ─────────────────────────────────────────────────

  async findContactosByEmpresa(empresaId: number): Promise<EmpresaContacto[]> {
    const repo = await this.tds.getRepository(EmpresaContacto);
    return repo.find({
      where: { empresa_id: empresaId },
      order: { is_principal: "DESC", nombres: "ASC" },
    });
  }

  async createContacto(dto: CreateEmpresaContactoDto): Promise<EmpresaContacto> {
    await this.findOneEmpresa(dto.empresa_id);
    const repo = await this.tds.getRepository(EmpresaContacto);
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

  async updateContacto(id: number, dto: Partial<CreateEmpresaContactoDto>): Promise<EmpresaContacto> {
    const repo = await this.tds.getRepository(EmpresaContacto);
    const c = await repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Contacto no encontrado");
    if (dto.nombres !== undefined) c.nombres = dto.nombres;
    if (dto.apellidos !== undefined) c.apellidos = dto.apellidos ?? null;
    if (dto.cargo !== undefined) c.cargo = dto.cargo ?? null;
    if (dto.correo !== undefined) c.correo = dto.correo ?? null;
    if (dto.telefono !== undefined) c.telefono = dto.telefono ?? null;
    if (dto.estado !== undefined) c.estado = dto.estado ?? "activo";
    if (dto.is_principal !== undefined) c.is_principal = dto.is_principal ? 1 : 0;
    return repo.save(c);
  }

  async removeContacto(id: number): Promise<{ ok: boolean }> {
    const repo = await this.tds.getRepository(EmpresaContacto);
    const c = await repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Contacto no encontrado");
    await repo.remove(c);
    return { ok: true };
  }
}
