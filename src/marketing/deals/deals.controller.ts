import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DealsService } from "./deals.service";
import { CreateDealDto } from "./dto/create-deal.dto";
import { UpdateDealDto } from "./dto/update-deal.dto";

@Controller("deals")
@UseGuards(AuthGuard("jwt"))
export class DealsController {
  constructor(private readonly service: DealsService) {}

  @Get()
  list(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("pageSize", new ParseIntPipe({ optional: true })) pageSize?: number,
  ) {
    return this.service.list({ page, pageSize });
  }

  // ✅ bigint -> string
  @Get(":id")
  get(@Param("id") id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateDealDto) {
    return this.service.create(dto);
  }

  // ✅ bigint -> string
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateDealDto) {
    return this.service.update(id, dto);
  }

  /**
   * (Opcional) Endpoint para cambiar etapa
   * PUT /deals/:id/stage/:toStageId
   */
  @Put(":id/stage/:toStageId")
  changeStage(
    @Param("id") id: string,
    @Param("toStageId") toStageId: string,
  ) {
    return this.service.changeStage({
      dealId: id,
      toStageId,
      changedById: null, // aquí normalmente sacas el userId del JWT
    });
  }
}
