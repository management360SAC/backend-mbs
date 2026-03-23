import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class SendCotizacionDto {
  @IsEmail()
  email_destino: string;

  @IsOptional()
  @IsString()
  asunto?: string;

  @IsOptional()
  @IsString()
  mensaje?: string;

  @IsOptional()
  @IsNumber()
  enviado_por?: number | null;
}
