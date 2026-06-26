import { Module } from "@nestjs/common";
import { CampaignsService } from "./campaigns.service";
import { CampaignsController } from "./campaigns.controller";
import { EmailService } from "../../cotizaciones/email.service";

@Module({
  controllers: [CampaignsController],
  providers: [CampaignsService, EmailService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
