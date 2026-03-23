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
exports.TouchpointsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const touchpoints_service_1 = require("./touchpoints.service");
const create_touchpoint_dto_1 = require("./dto/create-touchpoint.dto");
const update_touchpoint_dto_1 = require("./dto/update-touchpoint.dto");
let TouchpointsController = class TouchpointsController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(page, pageSize, contactId, campaignId, eventType) {
        return this.service.list({ page, pageSize, contactId, campaignId, eventType });
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
    remove(id) {
        return this.service.remove(id);
    }
};
exports.TouchpointsController = TouchpointsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page", new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)("pageSize", new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)("contactId")),
    __param(3, (0, common_1.Query)("campaignId")),
    __param(4, (0, common_1.Query)("eventType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], TouchpointsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TouchpointsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_touchpoint_dto_1.CreateTouchpointDto]),
    __metadata("design:returntype", void 0)
], TouchpointsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_touchpoint_dto_1.UpdateTouchpointDto]),
    __metadata("design:returntype", void 0)
], TouchpointsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TouchpointsController.prototype, "remove", null);
exports.TouchpointsController = TouchpointsController = __decorate([
    (0, common_1.Controller)("touchpoints"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [touchpoints_service_1.TouchpointsService])
], TouchpointsController);
//# sourceMappingURL=touchpoints.controller.js.map