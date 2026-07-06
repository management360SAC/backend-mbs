export declare class CreateEmpresaContactoDto {
    empresa_id: number;
    nombres: string;
    apellidos?: string | null;
    cargo?: string | null;
    correo?: string | null;
    telefono?: string | null;
    estado?: string;
    is_principal?: boolean;
}
