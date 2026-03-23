import { PartialType } from "@nestjs/mapped-types";
import { CreateMoodleUserMapDto } from "./create-moodle-user-map.dto";

export class UpdateMoodleUserMapDto extends PartialType(CreateMoodleUserMapDto) {}
