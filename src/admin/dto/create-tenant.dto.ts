import { IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class CreateTenantDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-z0-9-]+$/, { message: "slug solo puede contener letras minúsculas, números y guiones" })
  slug: string;

  @IsOptional()
  @IsString()
  adminEmail?: string;

  @IsOptional()
  @IsString()
  adminPassword?: string;

  @IsOptional()
  @IsString()
  adminFullName?: string;

  @IsOptional()
  @IsString()
  parentSlug?: string;
}
