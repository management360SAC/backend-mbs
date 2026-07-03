import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CotizacionesService } from "./cotizaciones.service";
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto";
import { CambiarEstadoDto, UpdateCotizacionDto } from "./dto/update-cotizacion.dto";
import { SendCotizacionDto } from "./dto/send-cotizacion.dto";
import { ManualEmailDto } from "./dto/manual-email.dto";

@UseGuards(JwtAuthGuard)
@Controller("cotizaciones")
export class CotizacionesController {
  constructor(private readonly service: CotizacionesService) {}

  @Post()
  create(@Body() dto: CreateCotizacionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query("estado") estado?: string,
    @Query("contact_id") contactId?: string,
    @Query("q") q?: string,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
  ) {
    return this.service.findAll({
      estado,
      contact_id: contactId ? Number(contactId) : undefined,
      q,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 50,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCotizacionDto) {
    return this.service.update(Number(id), dto);
  }

  @Patch(":id/estado")
  cambiarEstado(@Param("id") id: string, @Body() dto: CambiarEstadoDto) {
    return this.service.cambiarEstado(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }

  @Get(":id/pdf")
  async getPdf(@Param("id") id: string, @Res() res: Response) {
    try {
      const buffer = await this.service.generatePdf(Number(id));
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cotizacion-${id}.pdf"`,
        "Content-Length": buffer.length,
      });
      res.end(buffer);
    } catch (err: any) {
      res.status(500).json({ message: err.message ?? "Error generando PDF" });
    }
  }

  @Post(":id/enviar")
  enviar(@Param("id") id: string, @Body() dto: SendCotizacionDto) {
    return this.service.enviar(Number(id), dto);
  }

  @Post(":id/email-manual")
  emailManual(@Param("id") id: string, @Body() dto: ManualEmailDto) {
    return this.service.emailManual(Number(id), dto);
  }

  @Get(":id/envios")
  getEnvios(@Param("id") id: string) {
    return this.service.getEnvios(Number(id));
  }
}
