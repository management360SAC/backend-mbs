import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Deal } from "../../marketing/deals/Deal";
import { CreateDealDto } from "./dto/create-deal.dto";
import { UpdateDealDto } from "./dto/update-deal.dto";
import { FunnelStage } from "../funnel-stages/FunnelStage";
import { DealStageHistory } from "../deal-stage-history/DealStageHistory";

@Injectable()
export class DealsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async list(params: { page?: number; pageSize?: number }) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const repo = await this.tds.getRepository(Deal);
    const [items, total] = await repo.findAndCount({
      relations: ["contact", "campaign", "stage", "owner", "creator"],
      skip,
      take: pageSize,
      order: { createdAt: "DESC" },
    });

    return { page, pageSize, total, items };
  }

  async get(id: string) {
    const repo = await this.tds.getRepository(Deal);
    const deal = await repo.findOne({
      where: { id } as any,
      relations: ["contact", "campaign", "stage", "owner", "creator"],
    });

    if (!deal) throw new NotFoundException("Deal no existe");
    return deal;
  }

  async create(dto: CreateDealDto) {
    const stageId = (dto as any).stageId;
    if (stageId !== undefined && stageId !== null) {
      const stageRepo = await this.tds.getRepository(FunnelStage);
      const st = await stageRepo.findOne({ where: { id: String(stageId) } as any });
      if (!st) throw new NotFoundException("Stage no existe");
    }

    const repo = await this.tds.getRepository(Deal);
    const payload: DeepPartial<Deal> = {
      contactId: dto.contactId !== undefined && dto.contactId !== null ? String(dto.contactId) : undefined,
      campaignId: (dto as any).campaignId !== undefined && (dto as any).campaignId !== null ? String((dto as any).campaignId) : null,
      stageId: stageId !== undefined && stageId !== null ? String(stageId) : undefined,
      ownerUserId: (dto as any).ownerUserId !== undefined && (dto as any).ownerUserId !== null ? String((dto as any).ownerUserId) : null,
      createdBy: (dto as any).createdBy !== undefined && (dto as any).createdBy !== null ? String((dto as any).createdBy) : undefined,
      title: (dto as any).title,
      amount: (dto as any).amount !== undefined && (dto as any).amount !== null ? String((dto as any).amount) : "0",
      currency: (dto as any).currency ?? "PEN",
      probability: (dto as any).probability ?? null,
      expectedCloseDate: (dto as any).expectedCloseDate ? new Date((dto as any).expectedCloseDate) : null,
      status: (dto as any).status ?? "open",
      lostReason: (dto as any).lostReason ?? null,
    };

    const entity = repo.create(payload);
    const saved = await repo.save(entity);
    return this.get(String(saved.id));
  }

  async update(id: string, dto: UpdateDealDto) {
    await this.get(id);

    if ((dto as any).stageId) {
      throw new BadRequestException("Para cambiar de etapa usa el endpoint de changeStage.");
    }

    const repo = await this.tds.getRepository(Deal);
    await repo.update({ id } as any, dto as any);
    return this.get(id);
  }

  async changeStage(params: { dealId: string; toStageId: string; changedById?: string | null }) {
    const { dealId, toStageId, changedById = null } = params;
    const ds = await this.tds.getDataSource();

    return ds.transaction(async (manager) => {
      const dealRepo = manager.getRepository(Deal);
      const stageRepo = manager.getRepository(FunnelStage);
      const historyRepo = manager.getRepository(DealStageHistory);

      const deal = await dealRepo.findOne({ where: { id: dealId } as any });
      if (!deal) throw new NotFoundException("Deal no existe");

      const toStage = await stageRepo.findOne({ where: { id: String(toStageId) } as any });
      if (!toStage) throw new NotFoundException("Stage destino no existe");

      const fromStageId = String(deal.stageId);

      if (fromStageId === String(toStageId)) {
        throw new BadRequestException("El deal ya está en esa etapa");
      }

      deal.stageId = String(toStageId);
      await dealRepo.save(deal);

      await historyRepo.save({
        deal_id: String(deal.id),
        from_stage_id: Number(fromStageId),
        to_stage_id: Number(String(toStageId)),
        changed_by_id: changedById ? Number(String(changedById)) : null,
      } as any);

      return dealRepo.findOne({
        where: { id: dealId } as any,
        relations: ["contact", "campaign", "stage", "owner", "creator"],
      });
    });
  }
}
