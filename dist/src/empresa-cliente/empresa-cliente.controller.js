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
exports.EmpresaClienteController = void 0;
const common_1 = require("@nestjs/common");
const empresa_cliente_service_1 = require("./empresa-cliente.service");
const create_empresa_cliente_dto_1 = require("./dto/create-empresa-cliente.dto");
const create_empresa_contacto_dto_1 = require("./dto/create-empresa-contacto.dto");
let EmpresaClienteController = class EmpresaClienteController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(q, type, page, limit) {
        return this.service.findAllEmpresas(q, type, page ? parseInt(page) : 1, limit ? parseInt(limit) : 10);
    }
    findOne(id) {
        return this.service.findOneEmpresa(id);
    }
    create(dto) {
        return this.service.createEmpresa(dto);
    }
    update(id, dto) {
        return this.service.updateEmpresa(id, dto);
    }
    remove(id) {
        return this.service.removeEmpresa(id);
    }
    findContactos(id) {
        return this.service.findContactosByEmpresa(id);
    }
    createContacto(empresaId, dto) {
        dto.empresa_id = empresaId;
        return this.service.createContacto(dto);
    }
    updateContacto(id, dto) {
        return this.service.updateContacto(id, dto);
    }
    removeContacto(id) {
        return this.service.removeContacto(id);
    }
};
exports.EmpresaClienteController = EmpresaClienteController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("q")),
    __param(1, (0, common_1.Query)("type")),
    __param(2, (0, common_1.Query)("page")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_empresa_cliente_dto_1.CreateEmpresaClienteDto]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(":id/contactos"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "findContactos", null);
__decorate([
    (0, common_1.Post)(":id/contactos"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_empresa_contacto_dto_1.CreateEmpresaContactoDto]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "createContacto", null);
__decorate([
    (0, common_1.Patch)("contactos/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "updateContacto", null);
__decorate([
    (0, common_1.Delete)("contactos/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpresaClienteController.prototype, "removeContacto", null);
exports.EmpresaClienteController = EmpresaClienteController = __decorate([
    (0, common_1.Controller)("empresa-clientes"),
    __metadata("design:paramtypes", [empresa_cliente_service_1.EmpresaClienteService])
], EmpresaClienteController);
//# sourceMappingURL=empresa-cliente.controller.js.map