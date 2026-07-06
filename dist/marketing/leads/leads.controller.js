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
exports.LeadsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const leads_service_1 = require("./leads.service");
const create_lead_dto_1 = require("./dto/create-lead.dto");
const update_lead_dto_1 = require("./dto/update-lead.dto");
let LeadsController = class LeadsController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(q, page, pageSize, sourceId, sellerId, stageId) {
        return this.service.list({ q, page, pageSize, sourceId, sellerId, stageId });
    }
    get(id) {
        return this.service.get(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    changeStage(id, currentStageId) {
        return this.service.changeStage(id, currentStageId);
    }
    assignSeller(id, sellerId) {
        return this.service.assignSeller(id, sellerId);
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("q")),
    __param(1, (0, common_1.Query)("page", new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)("pageSize", new common_1.ParseIntPipe({ optional: true }))),
    __param(3, (0, common_1.Query)("sourceId", new common_1.ParseIntPipe({ optional: true }))),
    __param(4, (0, common_1.Query)("sellerId", new common_1.ParseIntPipe({ optional: true }))),
    __param(5, (0, common_1.Query)("stageId", new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lead_dto_1.CreateLeadDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_lead_dto_1.UpdateLeadDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(":id/stage"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)("currentStageId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "changeStage", null);
__decorate([
    (0, common_1.Put)(":id/seller"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)("sellerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "assignSeller", null);
exports.LeadsController = LeadsController = __decorate([
    (0, common_1.Controller)("leads"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [leads_service_1.LeadsService])
], LeadsController);
//# sourceMappingURL=leads.controller.js.map