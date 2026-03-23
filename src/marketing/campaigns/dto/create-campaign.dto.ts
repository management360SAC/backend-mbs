import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";
import { CAMPAIGN_TYPES } from "../Campaign";

export class CreateCampaignDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsIn(["EMAIL", "FACEBOOK", "WHATSAPP", "SMS", "LANDING", "OTHER"])
  type?: string;

  @IsOptional()
  @IsString()
  url?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  // ─── Campos email ───────────────────────────────────────────────────────
  @IsOptional()
  @IsString()
  @MaxLength(30)
  channel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  subject?: string;

  @IsOptional()
  @IsString()
  body_html?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  sender_name?: string;

  // ─── Recursos / meta ────────────────────────────────────────────────────
  @IsOptional()
  @IsString()
  recursos?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsNumber()
  created_by?: number;
}
