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
export interface Cotizacion {
    numero: string;
    estado: string;
    moneda: string;
    subtotal: number;
    descuento_pct: number;
    descuento_monto: number;
    impuesto_pct: number;
    impuesto_monto: number;
    total: number;
    created_at: string | Date | null;
    terminos: string | null;
    observaciones?: string | null;
}
export interface CotizacionDetalle {
    orden: number;
    descripcion: string;
    cantidad: number;
    precio_unitario: number;
    descuento_pct: number;
    subtotal: number;
}
export declare class PdfService {
    generateCotizacionPdf(cotizacion: Cotizacion, detalles: CotizacionDetalle[], empresa: EmpresaInfo, contact: ContactInfo | null): Promise<Buffer>;
}
