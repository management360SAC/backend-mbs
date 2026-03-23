import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ArrayUnique,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  full_name!: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  // password en create (recomendado)
  @IsString()
  @MinLength(8)
  password!: string;

  // roles por id
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  role_ids?: number[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  full_name?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  role_ids?: number[];
}

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  new_password!: string;
}
