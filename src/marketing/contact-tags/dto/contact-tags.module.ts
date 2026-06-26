import { Module } from "@nestjs/common";
import { ContactTagsService } from "./contact-tags.service";
import { ContactTagsController } from "./contact-tags.controller";

@Module({
  providers: [ContactTagsService],
  controllers: [ContactTagsController],
})
export class ContactTagsModule {}
