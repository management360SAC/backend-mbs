import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { EmpresaClienteService } from "./empresa-cliente.service";
import { CreateEmpresaClienteDto } from "./dto/create-empresa-cliente.dto";
import { CreateEmpresaContactoDto } from "./dto/create-empresa-contacto.dto";

@Controller("empresa-clientes")
export class EmpresaClienteController {
  constructor(private readonly service: EmpresaClienteService) {}

  // ── Empresas ──────────────────────────────────────────────────────────────

  @Get()
  findAll(
    @Query("q") q?: string,
    @Query("type") type?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.service.findAllEmpresas(q, type, page ? parseInt(page) : 1, limit ? parseInt(limit) : 10);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneEmpresa(id);
  }

  @Post()
  create(@Body() dto: CreateEmpresaClienteDto) {
    return this.service.createEmpresa(dto);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: Partial<CreateEmpresaClienteDto>) {
    return this.service.updateEmpresa(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.removeEmpresa(id);
  }

  // ── Contactos de empresa ─────────────────────────────────────────────────

  @Get(":id/contactos")
  findContactos(@Param("id", ParseIntPipe) id: number) {
    return this.service.findContactosByEmpresa(id);
  }

  @Post(":id/contactos")
  createContacto(
    @Param("id", ParseIntPipe) empresaId: number,
    @Body() dto: CreateEmpresaContactoDto,
  ) {
    dto.empresa_id = empresaId;
    return this.service.createContacto(dto);
  }

  @Patch("contactos/:id")
  updateContacto(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: Partial<CreateEmpresaContactoDto>,
  ) {
    return this.service.updateContacto(id, dto);
  }

  @Delete("contactos/:id")
  removeContacto(@Param("id", ParseIntPipe) id: number) {
    return this.service.removeContacto(id);
  }
}
