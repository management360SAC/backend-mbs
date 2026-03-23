import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Consent } from "../../notes/consents/Consent"
import { ConsentsService } from "./consents.service";
import { ConsentsController } from "./consents.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Consent])],
  providers: [ConsentsService],
  controllers: [ConsentsController],
})
export class ConsentsModule {}
