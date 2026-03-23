import { IsInt, IsString } from "class-validator";

export class CreateConsentDto {
  @IsInt()
  contactId: number;

  @IsString()
  consentType: string;
}
