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
exports.DealStageHistoryController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const deal_stage_history_service_1 = require("./deal-stage-history.service");
let DealStageHistoryController = class DealStageHistoryController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(dealId) {
        return this.service.listByDeal(dealId);
    }
};
exports.DealStageHistoryController = DealStageHistoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealStageHistoryController.prototype, "list", null);
exports.DealStageHistoryController = DealStageHistoryController = __decorate([
    (0, common_1.Controller)("deal-stage-history"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [deal_stage_history_service_1.DealStageHistoryService])
], DealStageHistoryController);
//# sourceMappingURL=deal-stage-history.controller.js.map