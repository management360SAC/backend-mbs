import { EmpresaContacto } from "./EmpresaContacto";
export declare class EmpresaCliente {
    id: number;
    type: string;
    razon_social: string | null;
    nombre_comercial: string | null;
    ruc: string | null;
    nombre_completo: string | null;
    documento_id: string | null;
    direccion: string | null;
    telefono: string | null;
    email: string | null;
    estado: string;
    observaciones: string | null;
    created_at: Date;
    updated_at: Date;
    contactos: EmpresaContacto[];
}
