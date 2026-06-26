import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { FunnelStage } from "./FunnelStage";
import { CreateFunnelStageDto } from "./dto/create-funnel-stage.dto";
import { UpdateFunnelStageDto } from "./dto/update-funnel-stage.dto";

@Injectable()
export class FunnelStagesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateFunnelStageDto) {
    const repo = await this.tds.getRepository(FunnelStage);
    return repo.save(repo.create(dto));
  }

  async findAll() {
    const repo = await this.tds.getRepository(FunnelStage);
    return repo.find({ order: { position: "ASC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(FunnelStage);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("FunnelStage no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateFunnelStageDto) {
    const repo = await this.tds.getRepository(FunnelStage);
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(FunnelStage);
    const e = await this.findOne(id);
    await repo.remove(e);
    return { ok: true };
  }
}
