import { IsString, IsEmail, IsOptional, IsNumber, IsInt } from "class-validator";

export class CreateLeadDto {
  @IsString()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @IsOptional()
  expectedValue?: number;

  @IsInt()
  @IsOptional()
  sourceId?: number;

  @IsInt()
  @IsOptional()
  sellerId?: number;

  @IsInt()
  currentStageId: number;
}