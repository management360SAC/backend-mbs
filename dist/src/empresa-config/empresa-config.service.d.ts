import { Repository } from "typeorm";
import { EmpresaConfig } from "./EmpresaConfig";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";
export declare class EmpresaConfigService {
    private readonly repo;
    constructor(repo: Repository<EmpresaConfig>);
    get(): Promise<EmpresaConfig>;
    update(dto: UpdateEmpresaConfigDto): Promise<EmpresaConfig>;
}
