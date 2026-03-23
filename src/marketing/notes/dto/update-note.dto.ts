import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MaxLength(20000)
  note?: string;

  @IsOptional()
  @IsString()
  contactId?: string | null;

  @IsOptional()
  @IsString()
  dealId?: string | null;
}
