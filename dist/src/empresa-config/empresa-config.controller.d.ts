import { EmpresaConfigService } from "./empresa-config.service";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";
export declare class EmpresaConfigController {
    private readonly service;
    constructor(service: EmpresaConfigService);
    get(): Promise<import("./EmpresaConfig").EmpresaConfig>;
    update(dto: UpdateEmpresaConfigDto): Promise<import("./EmpresaConfig").EmpresaConfig>;
}
