import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";

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
  constructor(
    @InjectRepository(Lead)
    private readonly leadsRepo: Repository<Lead>,

    @InjectRepository(LeadStage)
    private readonly stagesRepo: Repository<LeadStage>,

    @InjectRepository(Seller)
    private readonly sellersRepo: Repository<Seller>,

    @InjectRepository(LeadSource)
    private readonly sourcesRepo: Repository<LeadSource>,
  ) {}

  async list(params: ListParams) {
    const { q, page = 1, pageSize = 20, sourceId, sellerId, stageId } = params;

    const qb = this.leadsRepo
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
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async get(id: number) {
    const lead = await this.leadsRepo.findOne({
      where: { id },
      relations: ["source", "seller", "currentStage"],
    });

    if (!lead) throw new NotFoundException("Lead no encontrado");
    return lead;
  }

  async create(dto: CreateLeadDto) {
    const stage = await this.stagesRepo.findOne({
      where: { id: dto.currentStageId },
    });

    if (!stage) throw new NotFoundException("Stage no válido");

    const lead = this.leadsRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      notes: dto.notes,
      expectedValue: dto.expectedValue,
      sourceId: dto.sourceId,
      sellerId: dto.sellerId,
      currentStage: stage,
    } as any);

    return this.leadsRepo.save(lead);
  }

  async update(id: number, dto: UpdateLeadDto) {
    const lead = await this.leadsRepo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException("Lead no encontrado");

    Object.assign(lead, dto);
    return this.leadsRepo.save(lead);
  }

  async changeStage(id: number, currentStageId: number) {
    const lead = await this.leadsRepo.findOne({
      where: { id },
      relations: ["currentStage"],
    });
    if (!lead) throw new NotFoundException("Lead no encontrado");

    const stage = await this.stagesRepo.findOne({
      where: { id: currentStageId },
    });
    if (!stage) throw new NotFoundException("Stage no válido");

    lead.currentStage = stage;
    return this.leadsRepo.save(lead);
  }

  async assignSeller(id: number, sellerId: number | null) {
    const lead = await this.leadsRepo.findOne({
      where: { id },
      relations: ["seller"],
    });
    if (!lead) throw new NotFoundException("Lead no encontrado");

    if (sellerId === null) {
      lead.seller = null;
      return this.leadsRepo.save(lead);
    }

    const seller = await this.sellersRepo.findOne({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException("Seller no válido");

    lead.seller = seller;
    return this.leadsRepo.save(lead);
  }
}
