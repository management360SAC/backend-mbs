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
exports.ContactTag = void 0;
const typeorm_1 = require("typeorm");
const Contact_1 = require("../contacts/Contact");
const Tag_1 = require("../tags/Tag");
let ContactTag = class ContactTag {
    contactId;
    tagId;
    contact;
    tag;
    createdAt;
};
exports.ContactTag = ContactTag;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "contact_id", type: "int" }),
    __metadata("design:type", Number)
], ContactTag.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "tag_id", type: "int" }),
    __metadata("design:type", Number)
], ContactTag.prototype, "tagId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contact_1.Contact, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "contact_id" }),
    __metadata("design:type", Contact_1.Contact)
], ContactTag.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tag_1.Tag, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "tag_id" }),
    __metadata("design:type", Tag_1.Tag)
], ContactTag.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], ContactTag.prototype, "createdAt", void 0);
exports.ContactTag = ContactTag = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_contact_tags" })
], ContactTag);
//# sourceMappingURL=ContactTag.js.map