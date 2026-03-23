import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ContactTagsService } from "./contact-tags.service";
import { AttachTagDto } from "../../contact-tags/dto/attach-tag.dto";

@Controller("contact-tags")
@UseGuards(AuthGuard("jwt"))
export class ContactTagsController {
  constructor(private readonly service: ContactTagsService) {}

  @Post()
  attach(@Body() dto: AttachTagDto) {
    return this.service.attach(dto.contactId, dto.tagId);
  }

  @Delete(":contactId/:tagId")
  detach(
    @Param("contactId", ParseIntPipe) contactId: number,
    @Param("tagId", ParseIntPipe) tagId: number,
  ) {
    return this.service.detach(contactId, tagId);
  }

  @Get("contact/:contactId")
  listByContact(
    @Param("contactId", ParseIntPipe) contactId: number,
  ) {
    return this.service.findByContact(contactId);
  }
}
