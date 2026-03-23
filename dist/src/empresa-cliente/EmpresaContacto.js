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
exports.EmpresaContacto = void 0;
const typeorm_1 = require("typeorm");
const EmpresaCliente_1 = require("./EmpresaCliente");
let EmpresaContacto = class EmpresaContacto {
    id;
    empresa_id;
    empresa;
    nombres;
    apellidos;
    cargo;
    correo;
    telefono;
    estado;
    is_principal;
    created_at;
};
exports.EmpresaContacto = EmpresaContacto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmpresaContacto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "empresa_id" }),
    __metadata("design:type", Number)
], EmpresaContacto.prototype, "empresa_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmpresaCliente_1.EmpresaCliente, (e) => e.contactos, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "empresa_id" }),
    __metadata("design:type", EmpresaCliente_1.EmpresaCliente)
], EmpresaContacto.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], EmpresaContacto.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], EmpresaContacto.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], EmpresaContacto.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], EmpresaContacto.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: true }),
    __metadata("design:type", Object)
], EmpresaContacto.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "activo" }),
    __metadata("design:type", String)
], EmpresaContacto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", name: "is_principal", default: 0 }),
    __metadata("design:type", Number)
], EmpresaContacto.prototype, "is_principal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], EmpresaContacto.prototype, "created_at", void 0);
exports.EmpresaContacto = EmpresaContacto = __decorate([
    (0, typeorm_1.Entity)({ name: "mk_empresa_contacto" })
], EmpresaContacto);
//# sourceMappingURL=EmpresaContacto.js.map