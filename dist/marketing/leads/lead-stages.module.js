"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStagesModule = void 0;
const common_1 = require("@nestjs/common");
const lead_stages_service_1 = require("../../marketing/lead-stages/lead-stages.service");
const lead_stages_controller_1 = require("../../marketing/lead-stages/lead-stages.controller");
let LeadStagesModule = class LeadStagesModule {
};
exports.LeadStagesModule = LeadStagesModule;
exports.LeadStagesModule = LeadStagesModule = __decorate([
    (0, common_1.Module)({
        providers: [lead_stages_service_1.LeadStagesService],
        controllers: [lead_stages_controller_1.LeadStagesController],
        exports: [lead_stages_service_1.LeadStagesService],
    })
], LeadStagesModule);
//# sourceMappingURL=lead-stages.module.js.map