import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ActivityLogsService } from "./activity-logs.service";

@Controller("activity-logs")
@UseGuards(AuthGuard("jwt"))
export class ActivityLogsController {
  constructor(private readonly service: ActivityLogsService) {}

  @Get()
  findAll(
    @Query("entity_type") entity_type?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.service.getRecentActivity({
      entity_type,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });
  }
}
