import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Controller("mk/contacts")
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.service.create(dto);
  }

  // Soporta: ?type=lead&q=...&status=...&source_id=...
  @Get()
  findAll(
    @Query("type") type?: string,
    @Query("q") q?: string,
    @Query("status") status?: string,
    @Query("source_id") sourceId?: string,
  ) {
    return this.service.findAll({
      type,
      q,
      status,
      source_id: sourceId ? Number(sourceId) : undefined,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateContactDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
