import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateEmpresaContactoDto {
  @IsInt()
  empresa_id: number;

  @IsString()
  @MaxLength(100)
  nombres: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidos?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cargo?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  correo?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  estado?: string;

  @IsOptional()
  is_principal?: boolean;
}
