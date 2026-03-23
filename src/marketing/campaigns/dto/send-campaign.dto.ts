import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class SendCampaignDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  contact_ids?: number[];

  @IsOptional()
  @IsString()
  filter_status?: string; // filter mk_contacts by status
}
