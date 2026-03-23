import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FunnelStagesController } from "./funnel-stages.controller";
import { FunnelStagesService } from "./funnel-stages.service";
import { FunnelStage } from "../../marketing/funnel-stages/FunnelStage";

@Module({
  imports: [TypeOrmModule.forFeature([FunnelStage])],
  controllers: [FunnelStagesController],
  providers: [FunnelStagesService],
  exports: [FunnelStagesService],
})
export class FunnelStagesModule {}