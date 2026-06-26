import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";
import { CreateLeadStageDto } from "./dto/create-lead-stage.dto";
import { UpdateLeadStageDto } from "./dto/update-lead-stage.dto";

@Injectable()
export class LeadStagesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async findAll() {
    const repo = await this.tds.getRepository(LeadStage);
    return repo.find({ order: { order: "ASC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(LeadStage);
    const stage = await repo.findOne({ where: { id } });
    if (!stage) throw new NotFoundException("Stage no encontrado");
    return stage;
  }

  async create(dto: CreateLeadStageDto) {
    const repo = await this.tds.getRepository(LeadStage);
    return repo.save(repo.create(dto));
  }

  async update(id: number, dto: UpdateLeadStageDto) {
    const repo = await this.tds.getRepository(LeadStage);
    const stage = await this.findOne(id);
    Object.assign(stage, dto);
    return repo.save(stage);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(LeadStage);
    const stage = await this.findOne(id);
    return repo.remove(stage);
  }
}
