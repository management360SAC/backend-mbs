import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreatePaymentDto {
  @IsInt()
  contact_id: number;

  @IsInt()
  course_id: number;

  @IsInt()
  @IsOptional()
  enrollment_id?: number;

  @IsString()
  @IsNotEmpty()
  payment_type: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsDateString()
  payment_date: string;

  @IsString()
  @IsOptional()
  note?: string;

  // alias — frontend sends "notes" in some contexts
  @IsString()
  @IsOptional()
  notes?: string;
}
