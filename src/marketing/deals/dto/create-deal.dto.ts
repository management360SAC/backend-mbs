import { IsString, IsNumber, IsInt, IsOptional, IsDateString } from "class-validator";

export class CreateDealDto {
  @IsInt()
  @IsOptional()
  contactId?: number;

  @IsInt()
  @IsOptional()
  campaignId?: number;

  @IsString()
  title: string;

  @IsInt()
  @IsOptional()
  stageId?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @IsOptional()
  probability?: number;

  @IsDateString()
  @IsOptional()
  expectedCloseDate?: string;
}