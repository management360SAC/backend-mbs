"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaClienteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const EmpresaCliente_1 = require("./EmpresaCliente");
const EmpresaContacto_1 = require("./EmpresaContacto");
const empresa_cliente_service_1 = require("./empresa-cliente.service");
const empresa_cliente_controller_1 = require("./empresa-cliente.controller");
let EmpresaClienteModule = class EmpresaClienteModule {
};
exports.EmpresaClienteModule = EmpresaClienteModule;
exports.EmpresaClienteModule = EmpresaClienteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([EmpresaCliente_1.EmpresaCliente, EmpresaContacto_1.EmpresaContacto])],
        controllers: [empresa_cliente_controller_1.EmpresaClienteController],
        providers: [empresa_cliente_service_1.EmpresaClienteService],
        exports: [empresa_cliente_service_1.EmpresaClienteService, typeorm_1.TypeOrmModule],
    })
], EmpresaClienteModule);
//# sourceMappingURL=empresa-cliente.module.js.map