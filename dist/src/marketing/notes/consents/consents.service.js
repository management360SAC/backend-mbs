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
exports.ConsentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Consent_1 = require("../../notes/consents/Consent");
let ConsentsService = class ConsentsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    grant(contactId, consentType) {
        return this.repo.save({
            contactId,
            consentType,
            granted: true,
            grantedAt: new Date(),
            revokedAt: null,
        });
    }
    revoke(id) {
        return this.repo.update({ id }, { granted: false, revokedAt: new Date() });
    }
    findByContact(contactId) {
        return this.repo.find({
            where: { contactId },
            order: { createdAt: "DESC" },
        });
    }
};
exports.ConsentsService = ConsentsService;
exports.ConsentsService = ConsentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Consent_1.Consent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConsentsService);
//# sourceMappingURL=consents.service.js.map