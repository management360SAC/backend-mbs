import { IsString, IsNumber, IsInt, IsOptional, IsDateString } from "class-validator";

export class CreateDealDto {
  @IsInt()
  contactId: number;

  @IsInt()
  @IsOptional()
  campaignId?: number;

  @IsString()
  title: string;

  @IsInt()
  stageId: number;

  @IsNumber()
  amount: number;

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