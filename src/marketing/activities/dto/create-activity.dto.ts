import { IsString, IsInt, IsOptional, IsDateString } from "class-validator";

export class CreateActivityDto {
  @IsInt()
  @IsOptional()
  contactId?: number;

  @IsInt()
  @IsOptional()
  dealId?: number;

  @IsInt()
  assignedTo: number;

  @IsString()
  type: string;

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueAt?: string;

  @IsDateString()
  @IsOptional()
  doneAt?: string;
}