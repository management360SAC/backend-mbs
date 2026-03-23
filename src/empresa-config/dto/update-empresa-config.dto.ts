import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEmpresaConfigDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  ruc?: string | null;

  @IsOptional()
  @IsString()
  direccion?: string | null;

  @IsOptional()
  @IsString()
  telefono?: string | null;

  @IsOptional()
  @IsString()
  email?: string | null;

  @IsOptional()
  @IsString()
  website?: string | null;

  @IsOptional()
  @IsString()
  logo_base64?: string | null;

  @IsOptional()
  @IsString()
  terminos?: string | null;

  @IsOptional()
  @IsString()
  smtp_host?: string | null;

  @IsOptional()
  @IsNumber()
  smtp_port?: number | null;

  @IsOptional()
  @IsString()
  smtp_user?: string | null;

  @IsOptional()
  @IsString()
  smtp_pass?: string | null;

  @IsOptional()
  @IsString()
  smtp_from?: string | null;
}
