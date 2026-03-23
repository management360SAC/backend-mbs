import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmpresaConfig } from "./EmpresaConfig";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";

@Injectable()
export class EmpresaConfigService {
  constructor(
    @InjectRepository(EmpresaConfig)
    private readonly repo: Repository<EmpresaConfig>,
  ) {}

  async get(): Promise<EmpresaConfig> {
    let config = await this.repo.findOne({ where: { id: 1 } });
    if (!config) {
      config = this.repo.create({ id: 1, nombre: "MBS" });
      await this.repo.save(config);
    }
    return config;
  }

  async update(dto: UpdateEmpresaConfigDto): Promise<EmpresaConfig> {
    const config = await this.get();
    Object.assign(config, dto);
    return this.repo.save(config);
  }
}
