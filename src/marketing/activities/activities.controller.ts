import { Controller, Get, Post, Body, Query, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ActivitiesService } from "./activities.service";
import { CreateActivityDto } from "./dto/create-activity.dto";

@Controller("activities")
@UseGuards(AuthGuard("jwt"))
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService) {}

  @Get()
  list(
    @Query("contactId", new ParseIntPipe({ optional: true })) contactId?: number,
    @Query("dealId", new ParseIntPipe({ optional: true })) dealId?: number,
  ) {
    return this.service.list({ contactId, dealId });
  }

  @Post()
  create(@Body() dto: CreateActivityDto) {
    return this.service.create(dto);
  }
}