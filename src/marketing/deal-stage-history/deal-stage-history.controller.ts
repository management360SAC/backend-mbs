import { Controller, Get, Query, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DealStageHistoryService } from "./deal-stage-history.service";

@Controller("deal-stage-history")
@UseGuards(AuthGuard("jwt"))
export class DealStageHistoryController {
  constructor(private readonly service: DealStageHistoryService) {}

  @Get()
  list(@Query("dealId", ParseIntPipe) dealId: number) {
    return this.service.listByDeal(dealId);
  }
}