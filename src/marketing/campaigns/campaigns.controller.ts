import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CampaignsService } from "./campaigns.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { UpdateCampaignDto } from "./dto/update-campaign.dto";
import { SendCampaignDto } from "./dto/send-campaign.dto";
import { SetFunnelStagesDto } from "./dto/set-funnel-stages.dto";

@UseGuards(JwtAuthGuard)
@Controller("marketing/campaigns")
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  // ─── CRUD ─────────────────────────────────────────────────────────────────

  @Post()
  create(@Body() dto: CreateCampaignDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query("type")   type?:   string,
    @Query("status") status?: string,
    @Query("q")      q?:      string,
  ) {
    return this.service.findAll({ type, status, q });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCampaignDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }

  // ─── Funnel stages (many-to-many) ─────────────────────────────────────────

  /** GET /marketing/campaigns/:id/funnels — etapas asociadas */
  @Get(":id/funnels")
  getFunnelStages(@Param("id") id: string) {
    return this.service.getFunnelStages(Number(id));
  }

  /** POST /marketing/campaigns/:id/funnels — reemplaza etapas asociadas */
  @Post(":id/funnels")
  setFunnelStages(@Param("id") id: string, @Body() dto: SetFunnelStagesDto) {
    return this.service.setFunnelStages(Number(id), dto.stage_ids);
  }

  // ─── Stats / Reportes ─────────────────────────────────────────────────────

  /** GET /marketing/campaigns/:id/stats — cierres, envíos, embudo */
  @Get(":id/stats")
  getStats(@Param("id") id: string) {
    return this.service.getStats(Number(id));
  }

  // ─── Email sending ────────────────────────────────────────────────────────

  @Post(":id/send")
  sendCampaign(@Param("id") id: string, @Body() dto: SendCampaignDto) {
    return this.service.sendCampaign(Number(id), dto);
  }

  @Get(":id/sends")
  getSends(@Param("id") id: string) {
    return this.service.getSends(Number(id));
  }
}
