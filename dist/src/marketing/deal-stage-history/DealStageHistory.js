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
exports.DealStageHistory = void 0;
const typeorm_1 = require("typeorm");
const Deal_1 = require("../../marketing/deals/Deal");
const FunnelStage_1 = require("../../marketing/funnel-stages/FunnelStage");
const user_entity_1 = require("../../users/user.entity");
let DealStageHistory = class DealStageHistory {
    id;
    deal_id;
    from_stage_id;
    to_stage_id;
    changed_by_id;
    deal;
    from_stage;
    to_stage;
    changed_by;
    changed_at;
};
exports.DealStageHistory = DealStageHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DealStageHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deal_id", type: "int" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], DealStageHistory.prototype, "deal_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "from_stage_id", type: "int" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], DealStageHistory.prototype, "from_stage_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "to_stage_id", type: "int" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], DealStageHistory.prototype, "to_stage_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "changed_by", type: "int", nullable: true }),
    __metadata("design:type", Object)
], DealStageHistory.prototype, "changed_by_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Deal_1.Deal, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "deal_id" }),
    __metadata("design:type", Deal_1.Deal)
], DealStageHistory.prototype, "deal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FunnelStage_1.FunnelStage, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "from_stage_id" }),
    __metadata("design:type", FunnelStage_1.FunnelStage)
], DealStageHistory.prototype, "from_stage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FunnelStage_1.FunnelStage, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "to_stage_id" }),
    __metadata("design:type", FunnelStage_1.FunnelStage)
], DealStageHistory.prototype, "to_stage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "changed_by" }),
    __metadata("design:type", Object)
], DealStageHistory.prototype, "changed_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "changed_at", type: "timestamp" }),
    __metadata("design:type", Date)
], DealStageHistory.prototype, "changed_at", void 0);
exports.DealStageHistory = DealStageHistory = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_deal_stage_history" })
], DealStageHistory);
//# sourceMappingURL=DealStageHistory.js.map