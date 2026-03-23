import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateDetalleDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio_unitario: number;

  @IsOptional()
  @IsNumber()
  descuento_pct?: number;

  @IsOptional()
  @IsNumber()
  orden?: number;
}

export class CreateCotizacionDto {
  @IsOptional()
  @IsNumber()
  contact_id?: number | null;

  @IsOptional()
  @IsNumber()
  empresa_id?: number | null;

  @IsOptional()
  @IsNumber()
  empresa_contacto_id?: number | null;

  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  observaciones?: string | null;

  @IsOptional()
  @IsString()
  terminos?: string | null;

  @IsOptional()
  @IsString()
  moneda?: string;

  @IsOptional()
  @IsNumber()
  descuento_pct?: number;

  @IsOptional()
  @IsNumber()
  impuesto_pct?: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  fecha_vigencia?: string | null;

  @IsOptional()
  @IsNumber()
  created_by?: number | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleDto)
  detalles?: CreateDetalleDto[];
}
