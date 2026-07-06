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
var FacebookLeadsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookLeadsController = void 0;
const common_1 = require("@nestjs/common");
const facebook_leads_service_1 = require("./facebook-leads.service");
let FacebookLeadsController = FacebookLeadsController_1 = class FacebookLeadsController {
    service;
    logger = new common_1.Logger(FacebookLeadsController_1.name);
    constructor(service) {
        this.service = service;
    }
    verifyWebhook(mode, token, challenge, res) {
        const expectedToken = (process.env.TOKEN_META ?? process.env.FB_VERIFY_TOKEN ?? "").trim();
        const receivedToken = (token ?? "").trim();
        this.logger.log(`Meta webhook verify — mode="${mode}" challenge="${challenge}" token_match=${receivedToken === expectedToken}`);
        if (!expectedToken) {
            this.logger.error("FB_VERIFY_TOKEN no está configurado");
            return res.status(500).send("Server misconfiguration");
        }
        if (!challenge) {
            this.logger.warn("Meta no envió hub.challenge");
            return res.status(400).send("Bad Request");
        }
        if (mode === "subscribe" && receivedToken === expectedToken) {
            this.logger.log("Webhook Meta verificado OK");
            return res.status(200).contentType("text/plain").send(challenge);
        }
        this.logger.warn(`Verificación fallida — recibido: "${receivedToken}" (${receivedToken.length} chars) esperado: "${expectedToken}" (${expectedToken.length} chars)`);
        return res.status(403).send("Forbidden");
    }
    async receiveWebhook(body) {
        if (body?.object !== "page")
            return { ok: true };
        const entries = body.entry ?? [];
        for (const entry of entries) {
            for (const change of entry.changes ?? []) {
                if (change.field === "leadgen" && change.value?.leadgen_id) {
                    const pageId = change.value.page_id ?? entry.id;
                    this.service
                        .processLeadgenId(change.value.leadgen_id, pageId)
                        .catch((err) => this.logger.error(`Error procesando leadgen_id: ${err}`));
                }
            }
        }
        return { ok: true };
    }
};
exports.FacebookLeadsController = FacebookLeadsController;
__decorate([
    (0, common_1.Get)("webhook"),
    __param(0, (0, common_1.Query)("hub.mode")),
    __param(1, (0, common_1.Query)("hub.verify_token")),
    __param(2, (0, common_1.Query)("hub.challenge")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], FacebookLeadsController.prototype, "verifyWebhook", null);
__decorate([
    (0, common_1.Post)("webhook"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacebookLeadsController.prototype, "receiveWebhook", null);
exports.FacebookLeadsController = FacebookLeadsController = FacebookLeadsController_1 = __decorate([
    (0, common_1.Controller)("facebook"),
    __metadata("design:paramtypes", [facebook_leads_service_1.FacebookLeadsService])
], FacebookLeadsController);
//# sourceMappingURL=facebook-leads.controller.js.map