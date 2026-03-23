import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FunnelStagesService } from "./funnel-stages.service";
import { CreateFunnelStageDto } from "./dto/create-funnel-stage.dto";
import { UpdateFunnelStageDto } from "./dto/update-funnel-stage.dto";

@Controller("marketing/funnel-stages")
export class FunnelStagesController {
  constructor(private readonly service: FunnelStagesService) {}

  @Post()
  create(@Body() dto: CreateFunnelStageDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateFunnelStageDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
