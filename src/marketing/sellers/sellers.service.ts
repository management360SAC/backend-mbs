import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Seller } from "./Seller";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";

@Injectable()
export class SellersService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async create(dto: CreateSellerDto) {
    const repo = await this.tds.getRepository(Seller);
    return repo.save(repo.create(dto));
  }

  async findAll() {
    const repo = await this.tds.getRepository(Seller);
    return repo.find({ order: { id: "DESC" } });
  }

  async findOne(id: number) {
    const repo = await this.tds.getRepository(Seller);
    const e = await repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException("Seller no encontrado");
    return e;
  }

  async update(id: number, dto: UpdateSellerDto) {
    const repo = await this.tds.getRepository(Seller);
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return repo.save(e);
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(Seller);
    const e = await this.findOne(id);
    await repo.remove(e);
    return { ok: true };
  }
}
