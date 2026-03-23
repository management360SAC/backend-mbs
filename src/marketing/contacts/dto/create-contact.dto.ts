import { IsInt, IsOptional, IsString, MaxLength, IsIn } from "class-validator";
import type { LeadStatus } from '../../contacts/Contact';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  type?: string;

  @IsString()
  @MaxLength(140)
  full_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  document_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @IsOptional()
  @IsInt()
  source_id?: number;

  @IsOptional()
  @IsInt()
  owner_user_id?: number;

  @IsOptional()
  @IsIn(["new", "contacted", "qualified", "nurturing", "proposal_sent", "won", "lost"])
  status?: LeadStatus;

  @IsOptional()
  @IsInt()
  score?: number;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  lost_reason?: string;

  @IsOptional()
  @IsInt()
  created_by?: number;
}