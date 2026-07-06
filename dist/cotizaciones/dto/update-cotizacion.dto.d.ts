import { CreateDetalleDto } from "./create-cotizacion.dto";
export declare class UpdateCotizacionDto {
    contact_id?: number | null;
    empresa_id?: number | null;
    empresa_contacto_id?: number | null;
    titulo?: string;
    observaciones?: string | null;
    terminos?: string | null;
    moneda?: string;
    descuento_pct?: number;
    impuesto_pct?: number;
    estado?: string;
    fecha_vigencia?: string | null;
    detalles?: CreateDetalleDto[];
}
export declare class CambiarEstadoDto {
    estado: string;
}
