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
exports.WebFormController = void 0;
const common_1 = require("@nestjs/common");
const web_form_service_1 = require("./web-form.service");
const submit_form_dto_1 = require("./dto/submit-form.dto");
let WebFormController = class WebFormController {
    service;
    constructor(service) {
        this.service = service;
    }
    async submitLead(apiKey, dto) {
        await this.service.submitLead(apiKey, dto);
        return { ok: true, message: "Lead recibido correctamente" };
    }
};
exports.WebFormController = WebFormController;
__decorate([
    (0, common_1.Post)("lead"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)("x-api-key")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_form_dto_1.SubmitFormDto]),
    __metadata("design:returntype", Promise)
], WebFormController.prototype, "submitLead", null);
exports.WebFormController = WebFormController = __decorate([
    (0, common_1.Controller)("web-form"),
    __metadata("design:paramtypes", [web_form_service_1.WebFormService])
], WebFormController);
//# sourceMappingURL=web-form.controller.js.map