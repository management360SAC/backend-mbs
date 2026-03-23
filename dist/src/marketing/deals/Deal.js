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
exports.Deal = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../contacts/Contact");
const Campaign_1 = require("../campaigns/Campaign");
const FunnelStage_1 = require("../funnel-stages/FunnelStage");
const user_entity_1 = require("../../users/user.entity");
let Deal = class Deal {
    id;
    contactId;
    campaignId;
    stageId;
    ownerUserId;
    createdBy;
    title;
    amount;
    currency;
    probability;
    expectedCloseDate;
    status;
    lostReason;
    createdAt;
    updatedAt;
    contact;
    campaign;
    stage;
    owner;
    creator;
};
exports.Deal = Deal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", String)
], Deal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "bigint" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Deal.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "campaign_id", type: "bigint", nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Deal.prototype, "campaignId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "stage_id", type: "bigint" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Deal.prototype, "stageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "owner_user_id", type: "bigint", nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Deal.prototype, "ownerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by", type: "bigint" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Deal.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Deal.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Deal.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "PEN" }),
    __metadata("design:type", String)
], Deal.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, comment: "Probabilidad de cierre (0-100)" }),
    __metadata("design:type", Object)
], Deal.prototype, "probability", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "expected_close_date", type: "date", nullable: true }),
    __metadata("design:type", Object)
], Deal.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, default: "open" }),
    __metadata("design:type", String)
], Deal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lost_reason", type: "text", nullable: true }),
    __metadata("design:type", Object)
], Deal.prototype, "lostReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Deal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Deal.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Contact_1.Contact)
], Deal.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Campaign_1.Campaign, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "campaign_id" }),
    __metadata("design:type", Object)
], Deal.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FunnelStage_1.FunnelStage, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "stage_id" }),
    __metadata("design:type", FunnelStage_1.FunnelStage)
], Deal.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "owner_user_id" }),
    __metadata("design:type", Object)
], Deal.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", user_entity_1.User)
], Deal.prototype, "creator", void 0);
exports.Deal = Deal = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_deals" })
], Deal);
//# sourceMappingURL=Deal.js.map