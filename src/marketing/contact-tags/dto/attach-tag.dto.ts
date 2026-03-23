import { IsInt } from "class-validator";

export class AttachTagDto {
  @IsInt()
  contactId: number;

  @IsInt()
  tagId: number;
}
