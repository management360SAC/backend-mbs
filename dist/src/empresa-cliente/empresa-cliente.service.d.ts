import { Repository } from "typeorm";
import { EmpresaCliente } from "./EmpresaCliente";
import { EmpresaContacto } from "./EmpresaContacto";
import { CreateEmpresaClienteDto } from "./dto/create-empresa-cliente.dto";
import { CreateEmpresaContactoDto } from "./dto/create-empresa-contacto.dto";
export declare class EmpresaClienteService {
    private readonly empresaRepo;
    private readonly contactoRepo;
    constructor(empresaRepo: Repository<EmpresaCliente>, contactoRepo: Repository<EmpresaContacto>);
    findAllEmpresas(q?: string, type?: string, page?: number, limit?: number): Promise<{
        data: EmpresaCliente[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOneEmpresa(id: number): Promise<EmpresaCliente>;
    createEmpresa(dto: CreateEmpresaClienteDto): Promise<EmpresaCliente>;
    updateEmpresa(id: number, dto: Partial<CreateEmpresaClienteDto>): Promise<EmpresaCliente>;
    removeEmpresa(id: number): Promise<{
        ok: boolean;
    }>;
    findContactosByEmpresa(empresaId: number): Promise<EmpresaContacto[]>;
    createContacto(dto: CreateEmpresaContactoDto): Promise<EmpresaContacto>;
    updateContacto(id: number, dto: Partial<CreateEmpresaContactoDto>): Promise<EmpresaContacto>;
    removeContacto(id: number): Promise<{
        ok: boolean;
    }>;
}
