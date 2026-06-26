import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Tag } from "./Tag";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async findAll() {
    const repo = await this.tds.getRepository(Tag);
    return repo.find({ order: { name: "ASC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(Tag);
    const tag = await repo.findOne({ where: { id } });
    if (!tag) throw new NotFoundException("Tag no encontrado");
    return tag;
  }

  async create(dto: CreateTagDto) {
    const repo = await this.tds.getRepository(Tag);
    const tag = repo.create(dto);
    return repo.save(tag);
  }

  async update(id: number, dto: UpdateTagDto) {
    const repo = await this.tds.getRepository(Tag);
    const tag = await this.findOne(id);
    Object.assign(tag, dto);
    return repo.save(tag);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(Tag);
    const tag = await this.findOne(id);
    return repo.remove(tag);
  }
}
