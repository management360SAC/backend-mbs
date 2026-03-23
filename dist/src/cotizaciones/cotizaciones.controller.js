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
exports.CotizacionesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
const cotizaciones_service_1 = require("./cotizaciones.service");
const create_cotizacion_dto_1 = require("./dto/create-cotizacion.dto");
const update_cotizacion_dto_1 = require("./dto/update-cotizacion.dto");
const send_cotizacion_dto_1 = require("./dto/send-cotizacion.dto");
let CotizacionesController = class CotizacionesController {
    service;
    empresaRepo;
    constructor(service, empresaRepo) {
        this.service = service;
        this.empresaRepo = empresaRepo;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll(estado, contactId, q, page, pageSize) {
        return this.service.findAll({
            estado,
            contact_id: contactId ? Number(contactId) : undefined,
            q,
            page: page ? Number(page) : 1,
            pageSize: pageSize ? Number(pageSize) : 50,
        });
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
    update(id, dto) {
        return this.service.update(Number(id), dto);
    }
    cambiarEstado(id, dto) {
        return this.service.cambiarEstado(Number(id), dto);
    }
    remove(id) {
        return this.service.remove(Number(id));
    }
    async getPdf(id, res) {
        try {
            const buffer = await this.service.generatePdf(Number(id), this.empresaRepo);
            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="cotizacion-${id}.pdf"`,
                "Content-Length": buffer.length,
            });
            res.end(buffer);
        }
        catch (err) {
            res.status(500).json({ message: err.message ?? "Error generando PDF" });
        }
    }
    enviar(id, dto) {
        return this.service.enviar(Number(id), dto, this.empresaRepo);
    }
    getEnvios(id) {
        return this.service.getEnvios(Number(id));
    }
};
exports.CotizacionesController = CotizacionesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cotizacion_dto_1.CreateCotizacionDto]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("estado")),
    __param(1, (0, common_1.Query)("contact_id")),
    __param(2, (0, common_1.Query)("q")),
    __param(3, (0, common_1.Query)("page")),
    __param(4, (0, common_1.Query)("pageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cotizacion_dto_1.UpdateCotizacionDto]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/estado"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cotizacion_dto_1.CambiarEstadoDto]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "cambiarEstado", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(":id/pdf"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "getPdf", null);
__decorate([
    (0, common_1.Post)(":id/enviar"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, send_cotizacion_dto_1.SendCotizacionDto]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "enviar", null);
__decorate([
    (0, common_1.Get)(":id/envios"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CotizacionesController.prototype, "getEnvios", null);
exports.CotizacionesController = CotizacionesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("cotizaciones"),
    __param(1, (0, typeorm_1.InjectRepository)(EmpresaConfig_1.EmpresaConfig)),
    __metadata("design:paramtypes", [cotizaciones_service_1.CotizacionesService,
        typeorm_2.Repository])
], CotizacionesController);
//# sourceMappingURL=cotizaciones.controller.js.map