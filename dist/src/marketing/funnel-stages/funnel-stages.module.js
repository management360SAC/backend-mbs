"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelStagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const funnel_stages_controller_1 = require("./funnel-stages.controller");
const funnel_stages_service_1 = require("./funnel-stages.service");
const FunnelStage_1 = require("../../marketing/funnel-stages/FunnelStage");
let FunnelStagesModule = class FunnelStagesModule {
};
exports.FunnelStagesModule = FunnelStagesModule;
exports.FunnelStagesModule = FunnelStagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([FunnelStage_1.FunnelStage])],
        controllers: [funnel_stages_controller_1.FunnelStagesController],
        providers: [funnel_stages_service_1.FunnelStagesService],
        exports: [funnel_stages_service_1.FunnelStagesService],
    })
], FunnelStagesModule);
//# sourceMappingURL=funnel-stages.module.js.map