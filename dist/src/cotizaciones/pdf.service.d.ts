import { Cotizacion } from "./Cotizacion";
import { CotizacionDetalle } from "./CotizacionDetalle";
export interface EmpresaInfo {
    nombre: string;
    ruc: string | null;
    direccion: string | null;
    telefono: string | null;
    email: string | null;
    website: string | null;
    logo_base64: string | null;
    terminos: string | null;
}
export interface ContactInfo {
    full_name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
}
export declare class PdfService {
    generateCotizacionPdf(cotizacion: Cotizacion, detalles: CotizacionDetalle[], empresa: EmpresaInfo, contact: ContactInfo | null): Promise<Buffer>;
}
