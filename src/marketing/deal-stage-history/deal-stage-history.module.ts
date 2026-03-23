import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DealStageHistoryController } from "./deal-stage-history.controller";
import { DealStageHistoryService } from "./deal-stage-history.service";
import { DealStageHistory } from "../../marketing/deal-stage-history/DealStageHistory";

@Module({
  imports: [TypeOrmModule.forFeature([DealStageHistory])],
  controllers: [DealStageHistoryController],
  providers: [DealStageHistoryService],
  exports: [DealStageHistoryService],
})
export class DealStageHistoryModule {}