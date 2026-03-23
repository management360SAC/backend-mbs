import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoodleUserMap } from "./MoodleUserMap";
import { CreateMoodleUserMapDto } from "./dto/create-moodle-user-map.dto";
import { UpdateMoodleUserMapDto } from "./dto/update-moodle-user-map.dto";

@Injectable()
export class MoodleUsersMapService {
  constructor(@InjectRepository(MoodleUserMap) private readonly repo: Repository<MoodleUserMap>) {}

  create(dto: CreateMoodleUserMapDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { id: "DESC" } });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("MoodleUserMap no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateMoodleUserMapDto) {
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
