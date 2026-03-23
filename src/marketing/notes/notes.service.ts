import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import { Note } from "./Note";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly repo: Repository<Note>,
  ) {}

  async list(params: {
    page?: number;
    pageSize?: number;
    contactId?: string;
    dealId?: string;
  }) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (params.contactId) where.contactId = String(params.contactId);
    if (params.dealId) where.dealId = String(params.dealId);

    const [items, total] = await this.repo.findAndCount({
      where,
      relations: ["contact", "deal", "creator"],
      order: { createdAt: "DESC" },
      skip,
      take: pageSize,
    });

    return { page, pageSize, total, items };
  }

  async get(id: string) {
    const note = await this.repo.findOne({
      where: { id } as any,
      relations: ["contact", "deal", "creator"],
    });

    if (!note) throw new NotFoundException("Note no existe");
    return note;
  }

  async create(dto: CreateNoteDto, createdBy: string) {
    // Debe estar asociado a algo (contact o deal)
    if (!dto.contactId && !dto.dealId) {
      throw new BadRequestException("Debes enviar contactId o dealId.");
    }

    const entity = this.repo.create({
      note: dto.note,
      contactId: dto.contactId ? String(dto.contactId) : null,
      dealId: dto.dealId ? String(dto.dealId) : null,
      createdBy: String(createdBy),
    } as DeepPartial<Note>);

    const saved = await this.repo.save(entity);
    return this.get(String(saved.id));
  }

  async update(id: string, dto: UpdateNoteDto) {
    await this.get(id);

    const patch: any = {};
    if (dto.note !== undefined) patch.note = dto.note;
    if (dto.contactId !== undefined) patch.contactId = dto.contactId === null ? null : String(dto.contactId);
    if (dto.dealId !== undefined) patch.dealId = dto.dealId === null ? null : String(dto.dealId);

    await this.repo.update({ id } as any, patch);
    return this.get(id);
  }

  async remove(id: string) {
    await this.get(id);
    await this.repo.delete({ id } as any);
    return { ok: true };
  }
}
