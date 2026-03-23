import { EmpresaCliente } from "./EmpresaCliente";
export declare class EmpresaContacto {
    id: number;
    empresa_id: number;
    empresa: EmpresaCliente;
    nombres: string;
    apellidos: string | null;
    cargo: string | null;
    correo: string | null;
    telefono: string | null;
    estado: string;
    is_principal: number;
    created_at: Date;
}
