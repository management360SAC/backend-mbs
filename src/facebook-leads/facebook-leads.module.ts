import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacebookLeadsController } from "./facebook-leads.controller";
import { FacebookLeadsService } from "./facebook-leads.service";
import { Lead } from "../marketing/leads/Lead";
import { LeadSource } from "../marketing/lead-sources/LeadSource";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";

@Module({
  imports: [TypeOrmModule.forFeature([Lead, LeadSource, LeadStage, EmpresaConfig])],
  controllers: [FacebookLeadsController],
  providers: [FacebookLeadsService],
})
export class FacebookLeadsModule {}
