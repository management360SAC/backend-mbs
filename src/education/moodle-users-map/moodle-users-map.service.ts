import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { MoodleUserMap } from "./MoodleUserMap";
import { CreateMoodleUserMapDto } from "./dto/create-moodle-user-map.dto";
import { UpdateMoodleUserMapDto } from "./dto/update-moodle-user-map.dto";

@Injectable()
export class MoodleUsersMapService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateMoodleUserMapDto) {
    const repo = await this.tds.getRepository(MoodleUserMap);
    return repo.save(repo.create(dto));
  }

  async findAll() {
    const repo = await this.tds.getRepository(MoodleUserMap);
    return repo.find({ order: { id: "DESC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(MoodleUserMap);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("MoodleUserMap no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateMoodleUserMapDto) {
    const repo = await this.tds.getRepository(MoodleUserMap);
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(MoodleUserMap);
    const e = await this.findOne(id);
    await repo.remove(e);
    return { ok: true };
  }
}
