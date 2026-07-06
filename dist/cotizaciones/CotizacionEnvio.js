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
exports.CotizacionEnvio = void 0;
const typeorm_1 = require("typeorm");
const Cotizacion_1 = require("./Cotizacion");
let CotizacionEnvio = class CotizacionEnvio {
    id;
    cotizacion_id;
    email_destino;
    asunto;
    mensaje;
    enviado_por;
    resultado;
    error_msg;
    enviado_at;
    cotizacion;
};
exports.CotizacionEnvio = CotizacionEnvio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CotizacionEnvio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], CotizacionEnvio.prototype, "cotizacion_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], CotizacionEnvio.prototype, "email_destino", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", Object)
], CotizacionEnvio.prototype, "asunto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], CotizacionEnvio.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], CotizacionEnvio.prototype, "enviado_por", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "PENDIENTE" }),
    __metadata("design:type", String)
], CotizacionEnvio.prototype, "resultado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], CotizacionEnvio.prototype, "error_msg", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CotizacionEnvio.prototype, "enviado_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cotizacion_1.Cotizacion, (c) => c.envios, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "cotizacion_id" }),
    __metadata("design:type", Cotizacion_1.Cotizacion)
], CotizacionEnvio.prototype, "cotizacion", void 0);
exports.CotizacionEnvio = CotizacionEnvio = __decorate([
    (0, typeorm_1.Entity)({ name: "cotizacion_envio" })
], CotizacionEnvio);
//# sourceMappingURL=CotizacionEnvio.js.map