import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";
import { CreateLeadStageDto } from "./dto/create-lead-stage.dto";
import { UpdateLeadStageDto } from "./dto/update-lead-stage.dto";

@Injectable()
export class LeadStagesService {
  constructor(
    @InjectRepository(LeadStage)
    private readonly repo: Repository<LeadStage>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { order: "ASC" },
    });
  }

  async findOne(id: number) {
    const stage = await this.repo.findOne({ where: { id } });
    if (!stage) {
      throw new NotFoundException("Stage no encontrado");
    }
    return stage;
  }

  create(dto: CreateLeadStageDto) {
    const stage = this.repo.create(dto);
    return this.repo.save(stage);
  }

  async update(id: number, dto: UpdateLeadStageDto) {
    const stage = await this.findOne(id);
    Object.assign(stage, dto);
    return this.repo.save(stage);
  }

  async remove(id: number) {
    const stage = await this.findOne(id);
    return this.repo.remove(stage);
  }
}
