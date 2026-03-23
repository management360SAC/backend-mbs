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
exports.Touchpoint = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../contacts/Contact");
const Campaign_1 = require("../campaigns/Campaign");
let Touchpoint = class Touchpoint {
    id;
    contactId;
    campaignId;
    eventType;
    eventAt;
    utmSource;
    utmMedium;
    utmCampaign;
    utmTerm;
    utmContent;
    referrer;
    landingUrl;
    ipAddress;
    userAgent;
    createdAt;
    contact;
    campaign;
};
exports.Touchpoint = Touchpoint;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", String)
], Touchpoint.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "bigint" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Touchpoint.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "campaign_id", type: "bigint", nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Touchpoint.prototype, "campaignId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "event_type", type: "varchar", length: 60 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Touchpoint.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "event_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "eventAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "utm_source", type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "utmSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "utm_medium", type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "utmMedium", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "utm_campaign", type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "utmCampaign", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "utm_term", type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "utmTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "utm_content", type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "utmContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "referrer", type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "landing_url", type: "varchar", length: 1000, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "landingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ip_address", type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_agent", type: "varchar", length: 512, nullable: true }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Touchpoint.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Contact_1.Contact)
], Touchpoint.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Campaign_1.Campaign, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "campaign_id" }),
    __metadata("design:type", Object)
], Touchpoint.prototype, "campaign", void 0);
exports.Touchpoint = Touchpoint = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_touchpoints" })
], Touchpoint);
//# sourceMappingURL=Touchpoint.js.map