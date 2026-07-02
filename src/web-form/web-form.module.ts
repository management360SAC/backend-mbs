import { Module } from "@nestjs/common";
import { WebFormController } from "./web-form.controller";
import { WebFormService } from "./web-form.service";

@Module({
  controllers: [WebFormController],
  providers: [WebFormService],
})
export class WebFormModule {}
