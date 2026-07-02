import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class SubmitFormDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(180)
  correo: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  mensaje?: string;
}
