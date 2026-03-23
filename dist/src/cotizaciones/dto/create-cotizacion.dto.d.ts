export declare class CreateDetalleDto {
    descripcion: string;
    cantidad: number;
    precio_unitario: number;
    descuento_pct?: number;
    orden?: number;
}
export declare class CreateCotizacionDto {
    contact_id?: number | null;
    empresa_id?: number | null;
    empresa_contacto_id?: number | null;
    titulo: string;
    observaciones?: string | null;
    terminos?: string | null;
    moneda?: string;
    descuento_pct?: number;
    impuesto_pct?: number;
    estado?: string;
    fecha_vigencia?: string | null;
    created_by?: number | null;
    detalles?: CreateDetalleDto[];
}
