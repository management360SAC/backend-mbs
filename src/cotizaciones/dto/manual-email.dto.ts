import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ManualEmailDto {
  @IsEmail()
  email_destino: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  asunto: string;

  @IsString()
  @IsNotEmpty()
  cuerpo: string;
}
