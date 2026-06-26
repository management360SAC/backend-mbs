import { Module } from "@nestjs/common";
import { FunnelStagesController } from "./funnel-stages.controller";
import { FunnelStagesService } from "./funnel-stages.service";

@Module({
  controllers: [FunnelStagesController],
  providers: [FunnelStagesService],
  exports: [FunnelStagesService],
})
export class FunnelStagesModule {}
