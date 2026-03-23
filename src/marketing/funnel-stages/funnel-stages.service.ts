import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FunnelStage } from "./FunnelStage";
import { CreateFunnelStageDto } from "./dto/create-funnel-stage.dto";
import { UpdateFunnelStageDto } from "./dto/update-funnel-stage.dto";

@Injectable()
export class FunnelStagesService {
  constructor(@InjectRepository(FunnelStage) private readonly repo: Repository<FunnelStage>) {}

  create(dto: CreateFunnelStageDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { position: "ASC" } });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("FunnelStage no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateFunnelStageDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { ok: true };
  }
}
