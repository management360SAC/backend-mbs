import { Cotizacion } from "./Cotizacion";
export declare class CotizacionDetalle {
    id: number;
    cotizacion_id: number;
    descripcion: string;
    cantidad: number;
    precio_unitario: number;
    descuento_pct: number;
    subtotal: number;
    orden: number;
    cotizacion: Cotizacion;
}
