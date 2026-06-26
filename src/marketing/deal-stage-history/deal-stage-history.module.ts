import { Module } from "@nestjs/common";
import { DealStageHistoryController } from "./deal-stage-history.controller";
import { DealStageHistoryService } from "./deal-stage-history.service";

@Module({
  controllers: [DealStageHistoryController],
  providers: [DealStageHistoryService],
  exports: [DealStageHistoryService],
})
export class DealStageHistoryModule {}
