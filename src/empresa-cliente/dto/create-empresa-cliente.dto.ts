import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateEmpresaClienteDto {
  @IsOptional()
  @IsIn(["empresa", "persona"])
  type?: string;

  // ── Empresa ──────────────────────────────────────────────────────────────
  @IsOptional()
  @IsString()
  @MaxLength(200)
  razon_social?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre_comercial?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  ruc?: string | null;

  // ── Persona ──────────────────────────────────────────────────────────────
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre_completo?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  documento_id?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  direccion?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  estado?: string;

  @IsOptional()
  @IsString()
  observaciones?: string | null;
}
