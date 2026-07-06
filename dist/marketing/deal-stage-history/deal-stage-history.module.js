"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealStageHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const deal_stage_history_controller_1 = require("./deal-stage-history.controller");
const deal_stage_history_service_1 = require("./deal-stage-history.service");
let DealStageHistoryModule = class DealStageHistoryModule {
};
exports.DealStageHistoryModule = DealStageHistoryModule;
exports.DealStageHistoryModule = DealStageHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [deal_stage_history_controller_1.DealStageHistoryController],
        providers: [deal_stage_history_service_1.DealStageHistoryService],
        exports: [deal_stage_history_service_1.DealStageHistoryService],
    })
], DealStageHistoryModule);
//# sourceMappingURL=deal-stage-history.module.js.map