import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "./Contact";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly repo: Repository<Contact>
  ) {}

  create(dto: CreateContactDto) {
    return this.repo.save(this.repo.create(dto));
  }

// contacts.service.ts
  async findAll(filters?: { type?: string; q?: string; status?: string; source_id?: number }) {
    const qb = this.repo.createQueryBuilder("c");

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
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("Contacto no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateContactDto) {
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
