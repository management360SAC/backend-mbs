"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookLeadsModule = void 0;
const common_1 = require("@nestjs/common");
const facebook_leads_controller_1 = require("./facebook-leads.controller");
const facebook_leads_service_1 = require("./facebook-leads.service");
let FacebookLeadsModule = class FacebookLeadsModule {
};
exports.FacebookLeadsModule = FacebookLeadsModule;
exports.FacebookLeadsModule = FacebookLeadsModule = __decorate([
    (0, common_1.Module)({
        controllers: [facebook_leads_controller_1.FacebookLeadsController],
        providers: [facebook_leads_service_1.FacebookLeadsService],
    })
], FacebookLeadsModule);
//# sourceMappingURL=facebook-leads.module.js.map