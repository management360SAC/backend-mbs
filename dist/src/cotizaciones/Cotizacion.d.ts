import { CotizacionDetalle } from "./CotizacionDetalle";
import { CotizacionEnvio } from "./CotizacionEnvio";
export type CotizacionEstado = "BORRADOR" | "GENERADA" | "ENVIADA" | "ACEPTADA" | "RECHAZADA" | "VENCIDA";
export declare class Cotizacion {
    id: number;
    numero: string;
    contact_id: number | null;
    empresa_id: number | null;
    empresa_contacto_id: number | null;
    titulo: string;
    observaciones: string | null;
    terminos: string | null;
    moneda: string;
    subtotal: number;
    descuento_pct: number;
    descuento_monto: number;
    impuesto_pct: number;
    impuesto_monto: number;
    total: number;
    estado: CotizacionEstado;
    fecha_vigencia: string | null;
    created_by: number | null;
    created_at: Date;
    updated_at: Date;
    detalles: CotizacionDetalle[];
    envios: CotizacionEnvio[];
}
