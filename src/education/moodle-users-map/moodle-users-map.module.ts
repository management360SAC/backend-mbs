import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoodleUserMap } from "./MoodleUserMap";
import { MoodleUsersMapController } from "../../education/moodle-users-map/MoodleUsersMapController";
import { MoodleUsersMapService } from "./moodle-users-map.service";

@Module({
  imports: [TypeOrmModule.forFeature([MoodleUserMap])],
  controllers: [MoodleUsersMapController],
  providers: [MoodleUsersMapService],
  exports: [MoodleUsersMapService],
})
export class MoodleUsersMapModule {}
