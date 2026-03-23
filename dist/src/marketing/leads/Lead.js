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
exports.Lead = void 0;
const typeorm_1 = require("typeorm");
const LeadSource_1 = require("../../marketing/lead-sources/LeadSource");
const Seller_1 = require("../../marketing/sellers/Seller");
const LeadStages_1 = require("../../marketing/lead-stages/LeadStages");
let Lead = class Lead {
    id;
    fullName;
    email;
    phone;
    notes;
    expectedValue;
    sourceId;
    sellerId;
    currentStageId;
    source;
    seller;
    currentStage;
    createdAt;
    updatedAt;
};
exports.Lead = Lead;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lead.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "full_name", type: "varchar", length: 140 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Lead.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 180, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Lead.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Lead.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "expected_value", type: "numeric", precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "expectedValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "source_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "sourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "seller_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "current_stage_id", type: "int" }),
    __metadata("design:type", Number)
], Lead.prototype, "currentStageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LeadSource_1.LeadSource, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "source_id" }),
    __metadata("design:type", Object)
], Lead.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Seller_1.Seller, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "seller_id" }),
    __metadata("design:type", Object)
], Lead.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LeadStages_1.LeadStage, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "current_stage_id" }),
    __metadata("design:type", LeadStages_1.LeadStage)
], Lead.prototype, "currentStage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Lead.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Lead.prototype, "updatedAt", void 0);
exports.Lead = Lead = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_leads" })
], Lead);
//# sourceMappingURL=Lead.js.map