import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTouchpointDto {
  @IsOptional() @IsString()
  contactId?: string;

  @IsOptional() @IsString()
  campaignId?: string | null;

  @IsOptional() @IsString() @MaxLength(60)
  eventType?: string;

  @IsOptional() @IsDateString()
  eventAt?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  utmSource?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  utmMedium?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  utmCampaign?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  utmTerm?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  utmContent?: string | null;

  @IsOptional() @IsString() @MaxLength(500)
  referrer?: string | null;

  @IsOptional() @IsString() @MaxLength(1000)
  landingUrl?: string | null;

  @IsOptional() @IsString() @MaxLength(64)
  ipAddress?: string | null;

  @IsOptional() @IsString() @MaxLength(512)
  userAgent?: string | null;
}
