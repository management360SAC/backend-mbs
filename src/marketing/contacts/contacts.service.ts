import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Contact } from "./Contact";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Injectable()
export class ContactsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateContactDto) {
    const repo = await this.tds.getRepository(Contact);
    return repo.save(repo.create(dto));
  }

  async findAll(filters?: { type?: string; q?: string; status?: string; source_id?: number }) {
    const repo = await this.tds.getRepository(Contact);
    const qb = repo.createQueryBuilder("c");

    if (filters?.type) qb.andWhere("c.type = :type", { type: filters.type });
    if (filters?.status) qb.andWhere("c.status = :status", { status: filters.status });
    if (filters?.source_id) qb.andWhere("c.source_id = :source_id", { source_id: filters.source_id });

    if (filters?.q) {
      qb.andWhere(
        "(c.full_name LIKE :q OR c.email LIKE :q OR c.phone LIKE :q)",
        { q: `%${filters.q}%` },
      );
    }

    qb.orderBy("c.id", "DESC");
    return qb.getMany();
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(Contact);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("Contacto no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateContactDto) {
    const repo = await this.tds.getRepository(Contact);
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(Contact);
    const e = await this.findOne(id);
    await repo.remove(e);
    return { ok: true };
  }
}
