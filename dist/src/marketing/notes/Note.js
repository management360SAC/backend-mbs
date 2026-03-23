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
exports.Note = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../contacts/Contact");
const Deal_1 = require("../deals/Deal");
const user_entity_1 = require("../../users/user.entity");
let Note = class Note {
    id;
    contactId;
    dealId;
    createdBy;
    note;
    createdAt;
    contact;
    deal;
    creator;
};
exports.Note = Note;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", String)
], Note.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_id", type: "bigint", nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Note.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deal_id", type: "bigint", nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Note.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by", type: "bigint" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Note.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Note.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Object)
], Note.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Deal_1.Deal, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "deal_id" }),
    __metadata("design:type", Object)
], Note.prototype, "deal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false, onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", user_entity_1.User)
], Note.prototype, "creator", void 0);
exports.Note = Note = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_notes" })
], Note);
//# sourceMappingURL=Note.js.map