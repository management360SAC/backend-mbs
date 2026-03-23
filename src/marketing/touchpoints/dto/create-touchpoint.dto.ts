import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTouchpointDto {
  @IsString()
  contactId: string;

  @IsOptional()
  @IsString()
  campaignId?: string | null;

  @IsString()
  @MaxLength(60)
  eventType: string;

  @IsOptional()
  @IsDateString()
  eventAt?: string;

  @IsOptional() @IsString() @MaxLength(120)
  utmSource?: string;

  @IsOptional() @IsString() @MaxLength(120)
  utmMedium?: string;

  @IsOptional() @IsString() @MaxLength(120)
  utmCampaign?: string;

  @IsOptional() @IsString() @MaxLength(120)
  utmTerm?: string;

  @IsOptional() @IsString() @MaxLength(120)
  utmContent?: string;

  @IsOptional() @IsString() @MaxLength(500)
  referrer?: string;

  @IsOptional() @IsString() @MaxLength(1000)
  landingUrl?: string;

  @IsOptional() @IsString() @MaxLength(64)
  ipAddress?: string;

  @IsOptional() @IsString() @MaxLength(512)
  userAgent?: string;
}
