import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { MoodleUsersMapService } from "./moodle-users-map.service";
import { CreateMoodleUserMapDto } from "./dto/create-moodle-user-map.dto";
import { UpdateMoodleUserMapDto } from "./dto/update-moodle-user-map.dto";

@Controller("education/moodle-users-map")
export class MoodleUsersMapController {
  constructor(private readonly service: MoodleUsersMapService) {}

  @Post()
  create(@Body() dto: CreateMoodleUserMapDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateMoodleUserMapDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
