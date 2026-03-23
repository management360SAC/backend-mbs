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
exports.Cotizacion = void 0;
const typeorm_1 = require("typeorm");
const CotizacionDetalle_1 = require("./CotizacionDetalle");
const CotizacionEnvio_1 = require("./CotizacionEnvio");
let Cotizacion = class Cotizacion {
    id;
    numero;
    contact_id;
    empresa_id;
    empresa_contacto_id;
    titulo;
    observaciones;
    terminos;
    moneda;
    subtotal;
    descuento_pct;
    descuento_monto;
    impuesto_pct;
    impuesto_monto;
    total;
    estado;
    fecha_vigencia;
    created_by;
    created_at;
    updated_at;
    detalles;
    envios;
};
exports.Cotizacion = Cotizacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cotizacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], Cotizacion.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "contact_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, name: "empresa_id" }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "empresa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, name: "empresa_contacto_id" }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "empresa_contacto_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], Cotizacion.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "terminos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "PEN" }),
    __metadata("design:type", String)
], Cotizacion.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cotizacion.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cotizacion.prototype, "descuento_pct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cotizacion.prototype, "descuento_monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 18 }),
    __metadata("design:type", Number)
], Cotizacion.prototype, "impuesto_pct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cotizacion.prototype, "impuesto_monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cotizacion.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "BORRADOR" }),
    __metadata("design:type", String)
], Cotizacion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "fecha_vigencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], Cotizacion.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cotizacion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cotizacion.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CotizacionDetalle_1.CotizacionDetalle, (d) => d.cotizacion, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], Cotizacion.prototype, "detalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CotizacionEnvio_1.CotizacionEnvio, (e) => e.cotizacion, { cascade: false, eager: false }),
    __metadata("design:type", Array)
], Cotizacion.prototype, "envios", void 0);
exports.Cotizacion = Cotizacion = __decorate([
    (0, typeorm_1.Entity)({ name: "cotizaciones" })
], Cotizacion);
//# sourceMappingURL=Cotizacion.js.map