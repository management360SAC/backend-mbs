import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSellerDto {
  @IsString()
  @MaxLength(140)
  full_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
