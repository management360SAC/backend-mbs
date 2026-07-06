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
exports.CambiarEstadoDto = exports.UpdateCotizacionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_cotizacion_dto_1 = require("./create-cotizacion.dto");
class UpdateCotizacionDto {
    contact_id;
    empresa_id;
    empresa_contacto_id;
    titulo;
    observaciones;
    terminos;
    moneda;
    descuento_pct;
    impuesto_pct;
    estado;
    fecha_vigencia;
    detalles;
}
exports.UpdateCotizacionDto = UpdateCotizacionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], UpdateCotizacionDto.prototype, "contact_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], UpdateCotizacionDto.prototype, "empresa_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], UpdateCotizacionDto.prototype, "empresa_contacto_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCotizacionDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateCotizacionDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateCotizacionDto.prototype, "terminos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCotizacionDto.prototype, "moneda", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCotizacionDto.prototype, "descuento_pct", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCotizacionDto.prototype, "impuesto_pct", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCotizacionDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateCotizacionDto.prototype, "fecha_vigencia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_cotizacion_dto_1.CreateDetalleDto),
    __metadata("design:type", Array)
], UpdateCotizacionDto.prototype, "detalles", void 0);
class CambiarEstadoDto {
    estado;
}
exports.CambiarEstadoDto = CambiarEstadoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CambiarEstadoDto.prototype, "estado", void 0);
//# sourceMappingURL=update-cotizacion.dto.js.map