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
exports.CampaignFunnel = void 0;
const typeorm_1 = require("typeorm");
const Campaign_1 = require("./Campaign");
const FunnelStage_1 = require("../funnel-stages/FunnelStage");
let CampaignFunnel = class CampaignFunnel {
    campaign_id;
    funnel_stage_id;
    created_at;
    campaign;
    funnel_stage;
};
exports.CampaignFunnel = CampaignFunnel;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "bigint", unsigned: true }),
    __metadata("design:type", Number)
], CampaignFunnel.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "bigint", unsigned: true }),
    __metadata("design:type", Number)
], CampaignFunnel.prototype, "funnel_stage_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CampaignFunnel.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Campaign_1.Campaign, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "campaign_id" }),
    __metadata("design:type", Campaign_1.Campaign)
], CampaignFunnel.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FunnelStage_1.FunnelStage, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "funnel_stage_id" }),
    __metadata("design:type", FunnelStage_1.FunnelStage)
], CampaignFunnel.prototype, "funnel_stage", void 0);
exports.CampaignFunnel = CampaignFunnel = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_campaign_funnels" })
], CampaignFunnel);
//# sourceMappingURL=CampaignFunnel.js.map