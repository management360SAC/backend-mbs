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
exports.DealsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const deals_service_1 = require("./deals.service");
const create_deal_dto_1 = require("./dto/create-deal.dto");
const update_deal_dto_1 = require("./dto/update-deal.dto");
let DealsController = class DealsController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(page, pageSize) {
        return this.service.list({ page, pageSize });
    }
    get(id) {
        return this.service.get(id);
    }
    create(dto, req) {
        dto.createdBy = req.user?.userId ?? req.user?.id ?? null;
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    changeStage(id, toStageId, req) {
        return this.service.changeStage({
            dealId: id,
            toStageId,
            changedById: req.user?.userId ?? req.user?.id ?? null,
        });
    }
    moveStage(id, body, req) {
        return this.service.changeStage({
            dealId: id,
            toStageId: String(body.to_stage_id),
            changedById: req.user?.userId ?? req.user?.id ?? null,
        });
    }
};
exports.DealsController = DealsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page", new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)("pageSize", new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deal_dto_1.CreateDealDto, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deal_dto_1.UpdateDealDto]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(":id/stage/:toStageId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("toStageId")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "changeStage", null);
__decorate([
    (0, common_1.Post)(":id/move-stage"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "moveStage", null);
exports.DealsController = DealsController = __decorate([
    (0, common_1.Controller)("deals"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [deals_service_1.DealsService])
], DealsController);
//# sourceMappingURL=deals.controller.js.map