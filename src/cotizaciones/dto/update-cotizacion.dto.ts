import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateDetalleDto } from "./create-cotizacion.dto";

export class UpdateCotizacionDto {
  @IsOptional()
  @IsNumber()
  contact_id?: number | null;

  @IsOptional()
  @IsNumber()
  empresa_id?: number | null;

  @IsOptional()
  @IsNumber()
  empresa_contacto_id?: number | null;

  @IsOptional()
  @IsString()
  titulo?: string;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleDto)
  detalles?: CreateDetalleDto[];
}

export class CambiarEstadoDto {
  @IsString()
  estado: string;
}
