import { ArrayUnique, IsArray, IsBoolean, IsInt, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export class CreateRoleDto {
  @IsString()
  @Length(2, 64)
  code!: string;

  @IsString()
  @Length(2, 120)
  name!: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;

  // ✅ ids (como ya tienes)
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  permission_ids?: number[];

  // ✅ keys (nuevo)
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  permission_keys?: string[];
}
