import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";
import { LeadStagesService } from "../../marketing/lead-stages/lead-stages.service";
import { LeadStagesController } from "../../marketing/lead-stages/lead-stages.controller";

@Module({
  imports: [TypeOrmModule.forFeature([LeadStage])],
  providers: [LeadStagesService],
  controllers: [LeadStagesController],
  exports: [TypeOrmModule],
})
export class LeadStagesModule {}
