import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Note } from "./Note";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async list(params: { page?: number; pageSize?: number; contactId?: string; dealId?: string }) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (params.contactId) where.contactId = String(params.contactId);
    if (params.dealId) where.dealId = String(params.dealId);

    const repo = await this.tds.getRepository(Note);
    const [items, total] = await repo.findAndCount({
      where,
      relations: ["contact", "deal", "creator"],
      order: { createdAt: "DESC" },
      skip,
      take: pageSize,
    });

    return { page, pageSize, total, items };
  }

  async get(id: string) {
    const repo = await this.tds.getRepository(Note);
    const note = await repo.findOne({
      where: { id } as any,
      relations: ["contact", "deal", "creator"],
    });

    if (!note) throw new NotFoundException("Note no existe");
    return note;
  }

  async create(dto: CreateNoteDto, createdBy: string) {
    if (!dto.contactId && !dto.dealId) {
      throw new BadRequestException("Debes enviar contactId o dealId.");
    }

    const repo = await this.tds.getRepository(Note);
    const entity = repo.create({
      note: dto.note,
      contactId: dto.contactId ? String(dto.contactId) : null,
      dealId: dto.dealId ? String(dto.dealId) : null,
      createdBy: String(createdBy),
    } as DeepPartial<Note>);

    const saved = await repo.save(entity);
    return this.get(String(saved.id));
  }

  async update(id: string, dto: UpdateNoteDto) {
    await this.get(id);
    const repo = await this.tds.getRepository(Note);

    const patch: any = {};
    if (dto.note !== undefined) patch.note = dto.note;
    if (dto.contactId !== undefined) patch.contactId = dto.contactId === null ? null : String(dto.contactId);
    if (dto.dealId !== undefined) patch.dealId = dto.dealId === null ? null : String(dto.dealId);

    await repo.update({ id } as any, patch);
    return this.get(id);
  }

  async remove(id: string) {
    await this.get(id);
    const repo = await this.tds.getRepository(Note);
    await repo.delete({ id } as any);
    return { ok: true };
  }
}
