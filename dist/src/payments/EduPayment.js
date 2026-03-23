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
exports.EduPayment = void 0;
const typeorm_1 = require("typeorm");
let EduPayment = class EduPayment {
    id;
    contactId;
    courseId;
    enrollmentId;
    paymentType;
    amount;
    currency;
    paymentMethod;
    paymentDate;
    note;
    createdAt;
    updatedAt;
};
exports.EduPayment = EduPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EduPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "int" }),
    __metadata("design:type", Number)
], EduPayment.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_id", type: "int" }),
    __metadata("design:type", Number)
], EduPayment.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "enrollment_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], EduPayment.prototype, "enrollmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_type", type: "varchar", length: 20, default: "advance" }),
    __metadata("design:type", String)
], EduPayment.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], EduPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "PEN" }),
    __metadata("design:type", String)
], EduPayment.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_method", type: "varchar", length: 50, default: "transferencia" }),
    __metadata("design:type", String)
], EduPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_date", type: "date" }),
    __metadata("design:type", String)
], EduPayment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], EduPayment.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], EduPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], EduPayment.prototype, "updatedAt", void 0);
exports.EduPayment = EduPayment = __decorate([
    (0, typeorm_1.Entity)({ name: "edu_payments" })
], EduPayment);
//# sourceMappingURL=EduPayment.js.map