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
exports.Consent = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../../contacts/Contact");
let Consent = class Consent {
    id;
    contactId;
    consentType;
    granted;
    grantedAt;
    revokedAt;
    contact;
    createdAt;
};
exports.Consent = Consent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Consent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "int" }),
    __metadata("design:type", Number)
], Consent.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "consent_type", type: "varchar", length: 40 }),
    __metadata("design:type", String)
], Consent.prototype, "consentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Consent.prototype, "granted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "granted_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Consent.prototype, "grantedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "revoked_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Consent.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Contact_1.Contact)
], Consent.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Consent.prototype, "createdAt", void 0);
exports.Consent = Consent = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_consents" })
], Consent);
//# sourceMappingURL=Consent.js.map