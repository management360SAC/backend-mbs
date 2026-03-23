import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import { Touchpoint } from "./Touchpoint";
import { CreateTouchpointDto } from "./dto/create-touchpoint.dto";
import { UpdateTouchpointDto } from "./dto/update-touchpoint.dto";

@Injectable()
export class TouchpointsService {
  constructor(
    @InjectRepository(Touchpoint)
    private readonly repo: Repository<Touchpoint>,
  ) {}

  async list(params: {
    page?: number;
    pageSize?: number;
    contactId?: string;
    campaignId?: string;
    eventType?: string;
  }) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (params.contactId) where.contactId = String(params.contactId);
    if (params.campaignId) where.campaignId = String(params.campaignId);
    if (params.eventType) where.eventType = String(params.eventType);

    const [items, total] = await this.repo.findAndCount({
      where,
      relations: ["contact", "campaign"],
      order: { eventAt: "DESC" },
      skip,
      take: pageSize,
    });

    return { page, pageSize, total, items };
  }

  async get(id: string) {
    const tp = await this.repo.findOne({
      where: { id } as any,
      relations: ["contact", "campaign"],
    });

    if (!tp) throw new NotFoundException("Touchpoint no existe");
    return tp;
  }

  async create(dto: CreateTouchpointDto) {
    const entity = this.repo.create({
      contactId: String(dto.contactId),
      campaignId: dto.campaignId ? String(dto.campaignId) : null,
      eventType: dto.eventType,
      eventAt: dto.eventAt ? new Date(dto.eventAt) : null,

      utmSource: dto.utmSource ?? null,
      utmMedium: dto.utmMedium ?? null,
      utmCampaign: dto.utmCampaign ?? null,
      utmTerm: dto.utmTerm ?? null,
      utmContent: dto.utmContent ?? null,

      referrer: dto.referrer ?? null,
      landingUrl: dto.landingUrl ?? null,
      ipAddress: dto.ipAddress ?? null,
      userAgent: dto.userAgent ?? null,
    } as DeepPartial<Touchpoint>);

    const saved = await this.repo.save(entity);
    return this.get(String(saved.id));
  }

  async update(id: string, dto: UpdateTouchpointDto) {
    await this.get(id);

    const patch: any = {};
    if (dto.contactId !== undefined) patch.contactId = String(dto.contactId);
    if (dto.campaignId !== undefined) patch.campaignId = dto.campaignId === null ? null : String(dto.campaignId);
    if (dto.eventType !== undefined) patch.eventType = dto.eventType;
    if (dto.eventAt !== undefined) patch.eventAt = dto.eventAt === null ? null : new Date(dto.eventAt);

    if (dto.utmSource !== undefined) patch.utmSource = dto.utmSource;
    if (dto.utmMedium !== undefined) patch.utmMedium = dto.utmMedium;
    if (dto.utmCampaign !== undefined) patch.utmCampaign = dto.utmCampaign;
    if (dto.utmTerm !== undefined) patch.utmTerm = dto.utmTerm;
    if (dto.utmContent !== undefined) patch.utmContent = dto.utmContent;

    if (dto.referrer !== undefined) patch.referrer = dto.referrer;
    if (dto.landingUrl !== undefined) patch.landingUrl = dto.landingUrl;
    if (dto.ipAddress !== undefined) patch.ipAddress = dto.ipAddress;
    if (dto.userAgent !== undefined) patch.userAgent = dto.userAgent;

    await this.repo.update({ id } as any, patch);
    return this.get(id);
  }

  async remove(id: string) {
    await this.get(id);
    await this.repo.delete({ id } as any);
    return { ok: true };
  }
}
