import { EmpresaClienteService } from "./empresa-cliente.service";
import { CreateEmpresaClienteDto } from "./dto/create-empresa-cliente.dto";
import { CreateEmpresaContactoDto } from "./dto/create-empresa-contacto.dto";
export declare class EmpresaClienteController {
    private readonly service;
    constructor(service: EmpresaClienteService);
    findAll(q?: string, type?: string, page?: string, limit?: string): Promise<{
        data: import("./EmpresaCliente").EmpresaCliente[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<import("./EmpresaCliente").EmpresaCliente>;
    create(dto: CreateEmpresaClienteDto): Promise<import("./EmpresaCliente").EmpresaCliente>;
    update(id: number, dto: Partial<CreateEmpresaClienteDto>): Promise<import("./EmpresaCliente").EmpresaCliente>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    findContactos(id: number): Promise<import("./EmpresaContacto").EmpresaContacto[]>;
    createContacto(empresaId: number, dto: CreateEmpresaContactoDto): Promise<import("./EmpresaContacto").EmpresaContacto>;
    updateContacto(id: number, dto: Partial<CreateEmpresaContactoDto>): Promise<import("./EmpresaContacto").EmpresaContacto>;
    removeContacto(id: number): Promise<{
        ok: boolean;
    }>;
}
