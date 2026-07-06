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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const activities_service_1 = require("./activities.service");
const create_activity_dto_1 = require("./dto/create-activity.dto");
let ActivitiesController = class ActivitiesController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(contactId, dealId) {
        return this.service.list({ contactId, dealId });
    }
    create(dto) {
        return this.service.create(dto);
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("contactId", new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)("dealId", new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_dto_1.CreateActivityDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "create", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, common_1.Controller)("activities"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [activities_service_1.ActivitiesService])
], ActivitiesController);
//# sourceMappingURL=activities.controller.js.map