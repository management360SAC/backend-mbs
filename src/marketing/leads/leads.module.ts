import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LeadsService } from "./leads.service";
import { LeadsController } from "./leads.controller";

import { Lead } from "./Lead";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";

import { Seller } from "../sellers/Seller";
import { LeadSource } from "../lead-sources/LeadSource";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, LeadStage, Seller, LeadSource]),
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
