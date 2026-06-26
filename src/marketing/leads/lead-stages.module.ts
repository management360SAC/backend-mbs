import { Module } from "@nestjs/common";
import { LeadStagesService } from "../../marketing/lead-stages/lead-stages.service";
import { LeadStagesController } from "../../marketing/lead-stages/lead-stages.controller";

@Module({
  providers: [LeadStagesService],
  controllers: [LeadStagesController],
  exports: [LeadStagesService],
})
export class LeadStagesModule {}
