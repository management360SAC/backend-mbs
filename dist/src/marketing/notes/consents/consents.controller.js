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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsentsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const consents_service_1 = require("./consents.service");
const create_consent_dto_1 = require("../../notes/consents/dto/create-consent.dto");
let ConsentsController = class ConsentsController {
    service;
    constructor(service) {
        this.service = service;
    }
    grant(dto) {
        return this.service.grant(dto.contactId, dto.consentType);
    }
    revoke(id) {
        return this.service.revoke(id);
    }
    list(contactId) {
        return this.service.findByContact(contactId);
    }
};
exports.ConsentsController = ConsentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consent_dto_1.CreateConsentDto]),
    __metadata("design:returntype", void 0)
], ConsentsController.prototype, "grant", null);
__decorate([
    (0, common_1.Put)(":id/revoke"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConsentsController.prototype, "revoke", null);
__decorate([
    (0, common_1.Get)("contact/:contactId"),
    __param(0, (0, common_1.Param)("contactId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConsentsController.prototype, "list", null);
exports.ConsentsController = ConsentsController = __decorate([
    (0, common_1.Controller)("consents"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [consents_service_1.ConsentsService])
], ConsentsController);
//# sourceMappingURL=consents.controller.js.map