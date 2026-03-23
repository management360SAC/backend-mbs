"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../../marketing/contacts/Contact");
const Course_1 = require("../../education/courses/Course");
const Deal_1 = require("../../marketing/deals/Deal");
let Enrollment = class Enrollment {
    id;
    contactId;
    courseId;
    dealId;
    status;
    amount;
    currency;
    moodleEnrolledAt;
    createdAt;
    contact;
    course;
    deal;
};
exports.Enrollment = Enrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Enrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "int" }),
    __metadata("design:type", Number)
], Enrollment.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_id", type: "int" }),
    __metadata("design:type", Number)
], Enrollment.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deal_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Enrollment.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, default: "pending" }),
    __metadata("design:type", String)
], Enrollment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Enrollment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "PEN" }),
    __metadata("design:type", String)
], Enrollment.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "moodle_enrolled_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Enrollment.prototype, "moodleEnrolledAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Enrollment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Contact_1.Contact)
], Enrollment.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Course_1.Course, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "course_id" }),
    __metadata("design:type", Course_1.Course)
], Enrollment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Deal_1.Deal, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deal_id" }),
    __metadata("design:type", Object)
], Enrollment.prototype, "deal", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, typeorm_1.Entity)({ name: "edu_enrollments" })
], Enrollment);
//# sourceMappingURL=Enrollment.js.map