import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LeadStagesService } from "./lead-stages.service";
import { CreateLeadStageDto } from "./dto/create-lead-stage.dto";
import { UpdateLeadStageDto } from "./dto/update-lead-stage.dto";

@Controller("lead-stages")
@UseGuards(AuthGuard("jwt"))
export class LeadStagesController {
  constructor(private readonly service: LeadStagesService) {}

  @Get()
  list() {
    return this.service.findAll();
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLeadStageDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateLeadStageDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
