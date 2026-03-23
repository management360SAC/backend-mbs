import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMoodleUserMapDto {
  @IsInt()
  contact_id: number;

  @IsInt()
  moodle_user_id: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  moodle_username?: string;
}
