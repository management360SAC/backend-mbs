import { Repository } from "typeorm";
import { Cotizacion } from "./Cotizacion";
import { CotizacionDetalle } from "./CotizacionDetalle";
import { CotizacionEnvio } from "./CotizacionEnvio";
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto";
import { CambiarEstadoDto, UpdateCotizacionDto } from "./dto/update-cotizacion.dto";
import { SendCotizacionDto } from "./dto/send-cotizacion.dto";
import { PdfService } from "./pdf.service";
import { EmailService } from "./email.service";
export declare class CotizacionesService {
    private readonly cotRepo;
    private readonly detalleRepo;
    private readonly envioRepo;
    private readonly pdfService;
    private readonly emailService;
    constructor(cotRepo: Repository<Cotizacion>, detalleRepo: Repository<CotizacionDetalle>, envioRepo: Repository<CotizacionEnvio>, pdfService: PdfService, emailService: EmailService);
    private generateNumero;
    private calcTotals;
    private syncContactStatus;
    create(dto: CreateCotizacionDto): Promise<Cotizacion>;
    findAll(filters?: {
        estado?: string;
        contact_id?: number;
        q?: string;
        page?: number;
        pageSize?: number;
    }): Promise<{
        data: Cotizacion[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
        };
    }>;
    findOne(id: number): Promise<Cotizacion>;
    update(id: number, dto: UpdateCotizacionDto): Promise<Cotizacion>;
    cambiarEstado(id: number, dto: CambiarEstadoDto): Promise<Cotizacion>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    generatePdf(id: number, empresaRepo: any): Promise<Buffer>;
    enviar(id: number, dto: SendCotizacionDto, empresaRepo: any): Promise<CotizacionEnvio>;
    getEnvios(id: number): Promise<CotizacionEnvio[]>;
}
