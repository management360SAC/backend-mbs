import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TouchpointsService } from "./touchpoints.service";
import { CreateTouchpointDto } from "./dto/create-touchpoint.dto";
import { UpdateTouchpointDto } from "./dto/update-touchpoint.dto";

@Controller("touchpoints")
@UseGuards(AuthGuard("jwt"))
export class TouchpointsController {
  constructor(private readonly service: TouchpointsService) {}

  @Get()
  list(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("pageSize", new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query("contactId") contactId?: string,
    @Query("campaignId") campaignId?: string,
    @Query("eventType") eventType?: string,
  ) {
    return this.service.list({ page, pageSize, contactId, campaignId, eventType });
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateTouchpointDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTouchpointDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
