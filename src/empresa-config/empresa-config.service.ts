import { Injectable } from "@nestjs/common";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { EmpresaConfig } from "./EmpresaConfig";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";

@Injectable()
export class EmpresaConfigService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async get(): Promise<EmpresaConfig> {
    const repo = await this.tds.getRepository(EmpresaConfig);
    let config = await repo.findOne({ where: { id: 1 } });
    if (!config) {
      config = repo.create({ id: 1, nombre: "MBS" });
      await repo.save(config);
    }
    return config;
  }

  async update(dto: UpdateEmpresaConfigDto): Promise<EmpresaConfig> {
    const repo = await this.tds.getRepository(EmpresaConfig);
    const config = await this.get();
    Object.assign(config, dto);
    return repo.save(config);
  }
}
