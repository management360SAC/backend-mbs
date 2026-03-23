import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "./Tag";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly repo: Repository<Tag>,
  ) {}

  findAll() {
    return this.repo.find({ order: { name: "ASC" } });
  }

  async findOne(id: number) {
    const tag = await this.repo.findOne({ where: { id } });
    if (!tag) throw new NotFoundException("Tag no encontrado");
    return tag;
  }

  create(dto: CreateTagDto) {
    const tag = this.repo.create(dto);
    return this.repo.save(tag);
  }

  async update(id: number, dto: UpdateTagDto) {
    const tag = await this.findOne(id);
    Object.assign(tag, dto);
    return this.repo.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    return this.repo.remove(tag);
  }
}
