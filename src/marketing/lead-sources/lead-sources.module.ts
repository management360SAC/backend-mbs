import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeadSource } from "./LeadSource";
import { LeadSourcesController } from "./lead-sources.controller";
import { LeadSourcesService } from "./lead-sources.service";

@Module({
  imports: [TypeOrmModule.forFeature([LeadSource])],
  controllers: [LeadSourcesController],
  providers: [LeadSourcesService],
  exports: [LeadSourcesService],
})
export class LeadSourcesModule {}
