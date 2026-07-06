"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationModule = void 0;
const common_1 = require("@nestjs/common");
const courses_module_1 = require("./courses/courses.module");
const moodle_users_map_module_1 = require("./moodle-users-map/moodle-users-map.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
let EducationModule = class EducationModule {
};
exports.EducationModule = EducationModule;
exports.EducationModule = EducationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            courses_module_1.CoursesModule,
            moodle_users_map_module_1.MoodleUsersMapModule,
            enrollments_module_1.EnrollmentsModule,
        ],
        exports: [courses_module_1.CoursesModule, moodle_users_map_module_1.MoodleUsersMapModule, enrollments_module_1.EnrollmentsModule],
    })
], EducationModule);
//# sourceMappingURL=education.module.js.map