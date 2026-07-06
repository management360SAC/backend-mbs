import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { Cotizacion } from "./Cotizacion";
import { CotizacionEnvio } from "./CotizacionEnvio";
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto";
import { CambiarEstadoDto, UpdateCotizacionDto } from "./dto/update-cotizacion.dto";
import { SendCotizacionDto } from "./dto/send-cotizacion.dto";
import { ManualEmailDto } from "./dto/manual-email.dto";
import { PdfService } from "./pdf.service";
import { EmailService } from "./email.service";
export declare class CotizacionesService {
    private readonly tds;
    private readonly pdfService;
    private readonly emailService;
    constructor(tds: TenantDataSourceService, pdfService: PdfService, emailService: EmailService);
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
    generatePdf(id: number): Promise<Buffer>;
    enviar(id: number, dto: SendCotizacionDto): Promise<CotizacionEnvio>;
    emailManual(id: number, dto: ManualEmailDto): Promise<CotizacionEnvio>;
    getEnvios(id: number): Promise<CotizacionEnvio[]>;
}
