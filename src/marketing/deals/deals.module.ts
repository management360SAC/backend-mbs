import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DealsController } from "./deals.controller";
import { DealsService } from "./deals.service";
import { Deal } from "../../marketing/deals/Deal";
import { FunnelStage } from "../../marketing/funnel-stages/FunnelStage";
import { Contact } from "../../marketing/contacts/Contact";
import { Campaign } from "../../marketing/campaigns/Campaign";

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal, FunnelStage, Contact, Campaign]),
  ],
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
})
export class DealsModule {}