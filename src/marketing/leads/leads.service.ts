import { Injectable, NotFoundException } from "@nestjs/common";
import { Brackets } from "typeorm";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Lead } from "./Lead";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";
import { Seller } from "../sellers/Seller";
import { LeadSource } from "../lead-sources/LeadSource";

interface ListParams {
  q?: string;
  page?: number;
  pageSize?: number;
  sourceId?: number;
  sellerId?: number;
  stageId?: number;
}

@Injectable()
export class LeadsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async list(params: ListParams) {
    const { q, page = 1, pageSize = 20, sourceId, sellerId, stageId } = params;
    const repo = await this.tds.getRepository(Lead);

    const qb = repo
      .createQueryBuilder("lead")
      .leftJoinAndSelect("lead.source", "source")
      .leftJoinAndSelect("lead.seller", "seller")
      .leftJoinAndSelect("lead.currentStage", "stage")
      .orderBy("lead.createdAt", "DESC")
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (q) {
      qb.andWhere(
        new Brackets((w) => {
          w.where("lead.fullName LIKE :q", { q: `%${q}%` })
            .orWhere("lead.email LIKE :q", { q: `%${q}%` })
            .orWhere("lead.phone LIKE :q", { q: `%${q}%` });
        }),
      );
    }

    if (sourceId) qb.andWhere("source.id = :sourceId", { sourceId });
    if (sellerId) qb.andWhere("seller.id = :sellerId", { sellerId });
    if (stageId) qb.andWhere("stage.id = :stageId", { stageId });

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    };
  }

  async get(id: number) {
    const repo = await this.tds.getRepository(Lead);
    const lead = await repo.findOne({
      where: { id },
      relations: ["source", "seller", "currentStage"],
    });

    if (!lead) throw new NotFoundException("Lead no encontrado");
    return lead;
  }

  async create(dto: CreateLeadDto) {
    const stagesRepo = await this.tds.getRepository(LeadStage);
    const stage = await stagesRepo.findOne({ where: { id: dto.currentStageId } });
    if (!stage) throw new NotFoundException("Stage no válido");

    const repo = await this.tds.getRepository(Lead);
    const lead = repo.create({
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      notes: dto.notes,
      expectedValue: dto.expectedValue,
      sourceId: dto.sourceId,
      sellerId: dto.sellerId,
      currentStage: stage,
    } as any);

    return repo.save(lead);
  }

  async update(id: number, dto: UpdateLeadDto) {
    const repo = await this.tds.getRepository(Lead);
    const lead = await repo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException("Lead no encontrado");

    Object.assign(lead, dto);
    return repo.save(lead);
  }

  async changeStage(id: number, currentStageId: number) {
    const repo = await this.tds.getRepository(Lead);
    const stagesRepo = await this.tds.getRepository(LeadStage);

    const lead = await repo.findOne({ where: { id }, relations: ["currentStage"] });
    if (!lead) throw new NotFoundException("Lead no encontrado");

    const stage = await stagesRepo.findOne({ where: { id: currentStageId } });
    if (!stage) throw new NotFoundException("Stage no válido");

    lead.currentStage = stage;
    return repo.save(lead);
  }

  async assignSeller(id: number, sellerId: number | null) {
    const repo = await this.tds.getRepository(Lead);
    const lead = await repo.findOne({ where: { id }, relations: ["seller"] });
    if (!lead) throw new NotFoundException("Lead no encontrado");

    if (sellerId === null) {
      lead.seller = null;
      return repo.save(lead);
    }

    const sellersRepo = await this.tds.getRepository(Seller);
    const seller = await sellersRepo.findOne({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException("Seller no válido");

    lead.seller = seller;
    return repo.save(lead);
  }
}
