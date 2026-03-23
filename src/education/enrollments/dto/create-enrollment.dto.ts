import { IsInt, IsString, IsNumber, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class CreateEnrollmentDto {
  @Type(() => Number)
  @IsInt()
  contactId: number;

  @Type(() => Number)
  @IsInt()
  courseId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  dealId?: number;

  @IsString()
  status: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsDateString()
  moodleEnrolledAt?: string;
}
