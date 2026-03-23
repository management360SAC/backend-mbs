import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesModule } from "./courses/courses.module";
import { MoodleUsersMapModule } from "./moodle-users-map/moodle-users-map.module";
import { EnrollmentsModule } from "./enrollments/enrollments.module";

@Module({
  imports: [
    CoursesModule,
    MoodleUsersMapModule,
    EnrollmentsModule,
  ],
  exports: [CoursesModule, MoodleUsersMapModule, EnrollmentsModule],
})
export class EducationModule {}