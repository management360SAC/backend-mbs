import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @MaxLength(60)
  code: string;

  @IsString()
  @MaxLength(140)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsInt()
  moodle_course_id?: number;
}
