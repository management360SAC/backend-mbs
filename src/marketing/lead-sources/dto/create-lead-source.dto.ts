import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLeadSourceDto {
  @IsString()
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  channel?: string;
}
