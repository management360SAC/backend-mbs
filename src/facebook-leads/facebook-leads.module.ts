import { Module } from "@nestjs/common";
import { FacebookLeadsController } from "./facebook-leads.controller";
import { FacebookLeadsService } from "./facebook-leads.service";

@Module({
  controllers: [FacebookLeadsController],
  providers: [FacebookLeadsService],
})
export class FacebookLeadsModule {}
