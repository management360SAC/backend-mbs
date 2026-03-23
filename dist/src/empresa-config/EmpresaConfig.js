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
exports.EmpresaConfig = void 0;
const typeorm_1 = require("typeorm");
let EmpresaConfig = class EmpresaConfig {
    id;
    nombre;
    ruc;
    direccion;
    telefono;
    email;
    website;
    logo_base64;
    terminos;
    smtp_host;
    smtp_port;
    smtp_user;
    smtp_pass;
    smtp_from;
    created_at;
    updated_at;
};
exports.EmpresaConfig = EmpresaConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmpresaConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, default: "MBS" }),
    __metadata("design:type", String)
], EmpresaConfig.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "ruc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "longtext", nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "logo_base64", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "terminos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "smtp_host", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, default: 587 }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "smtp_port", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "smtp_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "smtp_pass", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", Object)
], EmpresaConfig.prototype, "smtp_from", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmpresaConfig.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmpresaConfig.prototype, "updated_at", void 0);
exports.EmpresaConfig = EmpresaConfig = __decorate([
    (0, typeorm_1.Entity)({ name: "empresa_config" })
], EmpresaConfig);
//# sourceMappingURL=EmpresaConfig.js.map