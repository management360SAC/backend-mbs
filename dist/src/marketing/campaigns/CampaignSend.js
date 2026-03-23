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
exports.CampaignSend = void 0;
const typeorm_1 = require("typeorm");
let CampaignSend = class CampaignSend {
    id;
    campaign_id;
    contact_id;
    contact_email;
    contact_name;
    status;
    error_msg;
    sent_at;
};
exports.CampaignSend = CampaignSend;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CampaignSend.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], CampaignSend.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], CampaignSend.prototype, "contact_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], CampaignSend.prototype, "contact_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 140, default: "" }),
    __metadata("design:type", String)
], CampaignSend.prototype, "contact_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "sent" }),
    __metadata("design:type", String)
], CampaignSend.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], CampaignSend.prototype, "error_msg", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "sent_at" }),
    __metadata("design:type", Date)
], CampaignSend.prototype, "sent_at", void 0);
exports.CampaignSend = CampaignSend = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_campaign_sends" })
], CampaignSend);
//# sourceMappingURL=CampaignSend.js.map