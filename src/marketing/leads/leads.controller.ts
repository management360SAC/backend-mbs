import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Controller("leads")
@UseGuards(AuthGuard("jwt"))
export class LeadsController {
  constructor(private readonly service: LeadsService) {}

  @Get()
  list(
    @Query("q") q?: string,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("pageSize", new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query("sourceId", new ParseIntPipe({ optional: true })) sourceId?: number,
    @Query("sellerId", new ParseIntPipe({ optional: true })) sellerId?: number,
    @Query("stageId", new ParseIntPipe({ optional: true })) stageId?: number,
  ) {
    return this.service.list({ q, page, pageSize, sourceId, sellerId, stageId });
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateLeadDto) {
    return this.service.update(id, dto);
  }

  @Put(":id/stage")
  changeStage(
    @Param("id", ParseIntPipe) id: number,
    @Body("currentStageId", ParseIntPipe) currentStageId: number,
  ) {
    return this.service.changeStage(id, currentStageId);
  }

  @Put(":id/seller")
  assignSeller(
    @Param("id", ParseIntPipe) id: number,
    @Body("sellerId") sellerId: number | null,
  ) {
    return this.service.assignSeller(id, sellerId);
  }
}