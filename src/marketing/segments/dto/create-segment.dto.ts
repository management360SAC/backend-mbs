import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSegmentDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
