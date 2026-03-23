import {
  Controller,
  Post,
  Put,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConsentsService } from "./consents.service";
import { CreateConsentDto } from "../../notes/consents/dto/create-consent.dto";

@Controller("consents")
@UseGuards(AuthGuard("jwt"))
export class ConsentsController {
  constructor(private readonly service: ConsentsService) {}

  @Post()
  grant(@Body() dto: CreateConsentDto) {
    return this.service.grant(dto.contactId, dto.consentType);
  }

  @Put(":id/revoke")
  revoke(@Param("id", ParseIntPipe) id: number) {
    return this.service.revoke(id);
  }

  @Get("contact/:contactId")
  list(
    @Param("contactId", ParseIntPipe) contactId: number,
  ) {
    return this.service.findByContact(contactId);
  }
}
