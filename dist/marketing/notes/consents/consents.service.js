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
exports.ConsentsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../../tenant/tenant-datasource.service");
const Consent_1 = require("../../notes/consents/Consent");
let ConsentsService = class ConsentsService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async grant(contactId, consentType) {
        const repo = await this.tds.getRepository(Consent_1.Consent);
        return repo.save({
            contactId,
            consentType,
            granted: true,
            grantedAt: new Date(),
            revokedAt: null,
        });
    }
    async revoke(id) {
        const repo = await this.tds.getRepository(Consent_1.Consent);
        return repo.update({ id }, { granted: false, revokedAt: new Date() });
    }
    async findByContact(contactId) {
        const repo = await this.tds.getRepository(Consent_1.Consent);
        return repo.find({ where: { contactId }, order: { createdAt: "DESC" } });
    }
};
exports.ConsentsService = ConsentsService;
exports.ConsentsService = ConsentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], ConsentsService);
//# sourceMappingURL=consents.service.js.map