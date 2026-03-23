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
exports.Activity = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../contacts/Contact");
const Deal_1 = require("../deals/Deal");
const user_entity_1 = require("../../users/user.entity");
let Activity = class Activity {
    id;
    contact;
    contactId;
    deal;
    dealId;
    assignedUser;
    assignedTo;
    type;
    subject;
    description;
    dueAt;
    doneAt;
    createdBy;
    createdAt;
    updatedAt;
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Activity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Contact_1.Contact)
], Activity.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Deal_1.Deal, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deal_id" }),
    __metadata("design:type", Deal_1.Deal)
], Activity.prototype, "deal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deal_id", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "assigned_to" }),
    __metadata("design:type", user_entity_1.User)
], Activity.prototype, "assignedUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "assigned_to", type: "int" }),
    __metadata("design:type", Number)
], Activity.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40 }),
    __metadata("design:type", String)
], Activity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 140 }),
    __metadata("design:type", String)
], Activity.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "due_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], Activity.prototype, "dueAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "done_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], Activity.prototype, "doneAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Activity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Activity.prototype, "updatedAt", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_activities" })
], Activity);
//# sourceMappingURL=Activity.js.map