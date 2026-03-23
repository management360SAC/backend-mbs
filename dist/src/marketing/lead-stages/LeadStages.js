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
exports.LeadStage = void 0;
const typeorm_1 = require("typeorm");
let LeadStage = class LeadStage {
    id;
    name;
    order;
    isActive;
    isFinal;
    isWon;
    isLost;
    createdAt;
    updatedAt;
};
exports.LeadStage = LeadStage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LeadStage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 80 }),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], LeadStage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "order", type: "int", default: 0 }),
    __metadata("design:type", Number)
], LeadStage.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], LeadStage.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_final", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], LeadStage.prototype, "isFinal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_won", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], LeadStage.prototype, "isWon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_lost", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], LeadStage.prototype, "isLost", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], LeadStage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], LeadStage.prototype, "updatedAt", void 0);
exports.LeadStage = LeadStage = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_lead_stages" })
], LeadStage);
//# sourceMappingURL=LeadStages.js.map