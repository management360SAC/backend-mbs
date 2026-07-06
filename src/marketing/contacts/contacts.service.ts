import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Contact } from "./Contact";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

const VALID_STATUSES = ["new", "contacted", "qualified", "nurturing", "proposal_sent", "won", "lost"];

@Injectable()
export class ContactsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateContactDto) {
    const repo = await this.tds.getRepository(Contact);
    return repo.save(repo.create(dto));
  }

  async findAll(filters?: {
    type?: string;
    q?: string;
    status?: string;
    source_id?: number;
    page?: number;
    limit?: number;
  }) {
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

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 10000;

    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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

  async importContacts(buffer: Buffer): Promise<{ created: number; errors: { row: number; reason: string }[] }> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const XLSX = require("xlsx") as any;

    let wb: any;
    try {
      wb = XLSX.read(buffer, { type: "buffer" });
    } catch {
      throw new BadRequestException("No se pudo leer el archivo. Asegúrate de subir un .xlsx o .csv válido.");
    }

    const ws = wb.Sheets[wb.SheetNames[0]];
    if (!ws) throw new BadRequestException("El archivo no contiene hojas de datos.");

    const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });
    if (rows.length === 0) throw new BadRequestException("El archivo no contiene filas de datos.");

    const repo = await this.tds.getRepository(Contact);
    const errors: { row: number; reason: string }[] = [];
    let created = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const nombre = String(row.nombre ?? row.Nombre ?? row.full_name ?? row["Nombre"] ?? "").trim();

      if (!nombre) {
        errors.push({ row: i + 2, reason: "El campo 'nombre' es requerido" });
        continue;
      }

      const rawStatus = String(row.estado ?? row.status ?? "new").trim().toLowerCase();
      const status = VALID_STATUSES.includes(rawStatus) ? rawStatus : "new";

      const email = String(row.email ?? row.Email ?? "").trim() || null;
      const phone = String(row.telefono ?? row.Telefono ?? row.phone ?? "").trim() || null;
      const company = String(row.empresa ?? row.Empresa ?? row.company ?? "").trim() || null;
      const city = String(row.ciudad ?? row.Ciudad ?? row.city ?? "").trim() || null;
      const country = String(row.pais ?? row.Pais ?? row.country ?? "").trim() || null;

      try {
        await repo.save(
          repo.create({
            type: "lead",
            full_name: nombre,
            email,
            phone,
            company,
            status: status as any,
            city,
            country,
          }),
        );
        created++;
      } catch (e: any) {
        errors.push({ row: i + 2, reason: e.message ?? "Error desconocido" });
      }
    }

    return { created, errors };
  }
}
