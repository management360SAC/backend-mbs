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
exports.Campaign = exports.CAMPAIGN_STATUSES = exports.CAMPAIGN_TYPES = void 0;
const typeorm_1 = require("typeorm");
exports.CAMPAIGN_TYPES = ["EMAIL", "FACEBOOK", "WHATSAPP", "SMS", "LANDING", "OTHER"];
exports.CAMPAIGN_STATUSES = ["draft", "active", "paused", "completed", "inactive"];
let Campaign = class Campaign {
    id;
    name;
    type;
    url;
    status;
    start_date;
    end_date;
    budget;
    channel;
    subject;
    body_html;
    sender_name;
    recursos;
    created_by;
    created_at;
    updated_at;
};
exports.Campaign = Campaign;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], Campaign.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, default: "EMAIL" }),
    __metadata("design:type", String)
], Campaign.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, default: "draft" }),
    __metadata("design:type", String)
], Campaign.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, default: "email" }),
    __metadata("design:type", String)
], Campaign.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "body_html", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "sender_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "recursos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Campaign.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Campaign.prototype, "updated_at", void 0);
exports.Campaign = Campaign = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_campaigns" })
], Campaign);
//# sourceMappingURL=Campaign.js.map