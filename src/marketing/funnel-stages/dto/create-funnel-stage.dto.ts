import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateFunnelStageDto {
  @IsString()
  @MaxLength(80)
  name: string;

  @IsInt()
  position: number;

  @IsOptional()
  @IsBoolean()
  is_won?: boolean;

  @IsOptional()
  @IsBoolean()
  is_lost?: boolean;
}
