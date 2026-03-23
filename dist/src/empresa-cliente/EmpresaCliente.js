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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaCliente = void 0;
const typeorm_1 = require("typeorm");
const EmpresaContacto_1 = require("./EmpresaContacto");
let EmpresaCliente = class EmpresaCliente {
    id;
    type;
    razon_social;
    nombre_comercial;
    ruc;
    nombre_completo;
    documento_id;
    direccion;
    telefono;
    email;
    estado;
    observaciones;
    created_at;
    updated_at;
    contactos;
};
exports.EmpresaCliente = EmpresaCliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmpresaCliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "empresa" }),
    __metadata("design:type", String)
], EmpresaCliente.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "razon_social", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "nombre_comercial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "ruc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "nombre_completo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "documento_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "activo" }),
    __metadata("design:type", String)
], EmpresaCliente.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], EmpresaCliente.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], EmpresaCliente.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], EmpresaCliente.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmpresaContacto_1.EmpresaContacto, (c) => c.empresa, { cascade: false, eager: false }),
    __metadata("design:type", Array)
], EmpresaCliente.prototype, "contactos", void 0);
exports.EmpresaCliente = EmpresaCliente = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_empresa_cliente" })
], EmpresaCliente);
//# sourceMappingURL=EmpresaCliente.js.map