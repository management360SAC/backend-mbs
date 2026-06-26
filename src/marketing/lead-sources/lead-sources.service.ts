import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { LeadSource } from "./LeadSource";
import { CreateLeadSourceDto } from "./dto/create-lead-source.dto";
import { UpdateLeadSourceDto } from "./dto/update-lead-source.dto";

@Injectable()
export class LeadSourcesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateLeadSourceDto) {
    const repo = await this.tds.getRepository(LeadSource);
    return repo.save(repo.create(dto));
  }

  async findAll() {
    const repo = await this.tds.getRepository(LeadSource);
    return repo.find({ order: { id: "DESC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(LeadSource);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("LeadSource no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateLeadSourceDto) {
    const repo = await this.tds.getRepository(LeadSource);
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(LeadSource);
    const e = await this.findOne(id);
    await repo.remove(e);
    return { ok: true };
  }
}
