import { Injectable } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { DealStageHistory } from "./DealStageHistory";

@Injectable()
export class DealStageHistoryService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async listByDeal(dealId: number) {
    const repo = await this.tds.getRepository(DealStageHistory);
    return repo.find({
      where: { deal_id: dealId },
      relations: ["from_stage", "to_stage", "changed_by", "deal"],
      order: { changed_at: "DESC" },
    });
  }
}
