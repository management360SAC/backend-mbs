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
exports.CotizacionDetalle = void 0;
const typeorm_1 = require("typeorm");
const Cotizacion_1 = require("./Cotizacion");
let CotizacionDetalle = class CotizacionDetalle {
    id;
    cotizacion_id;
    descripcion;
    cantidad;
    precio_unitario;
    descuento_pct;
    subtotal;
    orden;
    cotizacion;
};
exports.CotizacionDetalle = CotizacionDetalle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "cotizacion_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300 }),
    __metadata("design:type", String)
], CotizacionDetalle.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 1 }),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "precio_unitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "descuento_pct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], CotizacionDetalle.prototype, "orden", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cotizacion_1.Cotizacion, (c) => c.detalles, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "cotizacion_id" }),
    __metadata("design:type", Cotizacion_1.Cotizacion)
], CotizacionDetalle.prototype, "cotizacion", void 0);
exports.CotizacionDetalle = CotizacionDetalle = __decorate([
    (0, typeorm_1.Entity)({ name: "cotizacion_detalle" })
], CotizacionDetalle);
//# sourceMappingURL=CotizacionDetalle.js.map