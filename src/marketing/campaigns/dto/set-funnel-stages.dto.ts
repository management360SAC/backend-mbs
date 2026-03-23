import { IsArray, IsNumber } from "class-validator";

export class SetFunnelStagesDto {
  @IsArray()
  @IsNumber({}, { each: true })
  stage_ids: number[];
}
