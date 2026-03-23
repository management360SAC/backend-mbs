import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @MaxLength(20000)
  note: string;

  // bigint en TS -> string
  @IsOptional()
  @IsString()
  contactId?: string;

  @IsOptional()
  @IsString()
  dealId?: string;
}
