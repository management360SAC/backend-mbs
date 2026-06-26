import { Module } from "@nestjs/common";
import { MoodleUsersMapController } from "../../education/moodle-users-map/MoodleUsersMapController";
import { MoodleUsersMapService } from "./moodle-users-map.service";

@Module({
  controllers: [MoodleUsersMapController],
  providers: [MoodleUsersMapService],
  exports: [MoodleUsersMapService],
})
export class MoodleUsersMapModule {}
