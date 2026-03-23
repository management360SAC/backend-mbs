import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DealStageHistory } from "./DealStageHistory";

@Injectable()
export class DealStageHistoryService {
  constructor(
    @InjectRepository(DealStageHistory)
    private readonly repo: Repository<DealStageHistory>,
  ) {}

  async listByDeal(dealId: number) {
    return this.repo.find({
      where: { deal_id: dealId },
      relations: ["from_stage", "to_stage", "changed_by", "deal"],
      order: { changed_at: "DESC" },
    });
  }
}
