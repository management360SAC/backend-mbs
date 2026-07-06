import type { Response } from "express";
import { CotizacionesService } from "./cotizaciones.service";
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto";
import { CambiarEstadoDto, UpdateCotizacionDto } from "./dto/update-cotizacion.dto";
import { SendCotizacionDto } from "./dto/send-cotizacion.dto";
import { ManualEmailDto } from "./dto/manual-email.dto";
export declare class CotizacionesController {
    private readonly service;
    constructor(service: CotizacionesService);
    create(dto: CreateCotizacionDto): Promise<import("./Cotizacion").Cotizacion>;
    findAll(estado?: string, contactId?: string, q?: string, page?: string, pageSize?: string): Promise<{
        data: import("./Cotizacion").Cotizacion[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
        };
    }>;
    findOne(id: string): Promise<import("./Cotizacion").Cotizacion>;
    update(id: string, dto: UpdateCotizacionDto): Promise<import("./Cotizacion").Cotizacion>;
    cambiarEstado(id: string, dto: CambiarEstadoDto): Promise<import("./Cotizacion").Cotizacion>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
    getPdf(id: string, res: Response): Promise<void>;
    enviar(id: string, dto: SendCotizacionDto): Promise<import("./CotizacionEnvio").CotizacionEnvio>;
    emailManual(id: string, dto: ManualEmailDto): Promise<import("./CotizacionEnvio").CotizacionEnvio>;
    getEnvios(id: string): Promise<import("./CotizacionEnvio").CotizacionEnvio[]>;
}
