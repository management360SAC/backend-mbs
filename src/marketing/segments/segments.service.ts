import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Segment } from "./Segment";
import { CreateSegmentDto } from "./dto/create-segment.dto";
import { UpdateSegmentDto } from "./dto/update-segment.dto";

@Injectable()
export class SegmentsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateSegmentDto) {
    const repo = await this.tds.getRepository(Segment);
    return repo.save(repo.create(dto));
  }

  async findAll() {
    const repo = await this.tds.getRepository(Segment);
    return repo.find({ order: { id: "DESC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(Segment);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("Segment no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateSegmentDto) {
    const repo = await this.tds.getRepository(Segment);
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(Segment);
    const e = await this.findOne(id);
    await repo.remove(e);
    return { ok: true };
  }
}
