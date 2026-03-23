import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactTag } from "../ContactTag";
import { ContactTagsService } from "./contact-tags.service";
import { ContactTagsController } from "./contact-tags.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ContactTag])],
  providers: [ContactTagsService],
  controllers: [ContactTagsController],
})
export class ContactTagsModule {}
