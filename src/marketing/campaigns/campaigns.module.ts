import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Campaign } from "./Campaign";
import { CampaignFunnel } from "./CampaignFunnel";
import { CampaignSend } from "./CampaignSend";
import { CampaignsService } from "./campaigns.service";
import { CampaignsController } from "./campaigns.controller";
import { EmailService } from "../../cotizaciones/email.service";

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, CampaignFunnel, CampaignSend])],
  controllers: [CampaignsController],
  providers: [CampaignsService, EmailService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
