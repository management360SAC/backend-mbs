import { PartialType } from "@nestjs/mapped-types";
import { CreateFunnelStageDto } from "./create-funnel-stage.dto";

export class UpdateFunnelStageDto extends PartialType(CreateFunnelStageDto) {}
