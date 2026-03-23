import { Cotizacion } from "./Cotizacion";
export declare class CotizacionEnvio {
    id: number;
    cotizacion_id: number;
    email_destino: string;
    asunto: string | null;
    mensaje: string | null;
    enviado_por: number | null;
    resultado: string;
    error_msg: string | null;
    enviado_at: Date;
    cotizacion: Cotizacion;
}
