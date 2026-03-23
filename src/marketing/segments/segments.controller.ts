import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { SegmentsService } from "./segments.service";
import { CreateSegmentDto } from "./dto/create-segment.dto";
import { UpdateSegmentDto } from "./dto/update-segment.dto";

@Controller("marketing/segments")
export class SegmentsController {
  constructor(private readonly service: SegmentsService) {}

  @Post()
  create(@Body() dto: CreateSegmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSegmentDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
