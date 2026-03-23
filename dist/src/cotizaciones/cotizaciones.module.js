"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotizacionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Cotizacion_1 = require("./Cotizacion");
const CotizacionDetalle_1 = require("./CotizacionDetalle");
const CotizacionEnvio_1 = require("./CotizacionEnvio");
const cotizaciones_service_1 = require("./cotizaciones.service");
const cotizaciones_controller_1 = require("./cotizaciones.controller");
const pdf_service_1 = require("./pdf.service");
const email_service_1 = require("./email.service");
const empresa_config_module_1 = require("../empresa-config/empresa-config.module");
let CotizacionesModule = class CotizacionesModule {
};
exports.CotizacionesModule = CotizacionesModule;
exports.CotizacionesModule = CotizacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Cotizacion_1.Cotizacion, CotizacionDetalle_1.CotizacionDetalle, CotizacionEnvio_1.CotizacionEnvio]),
            empresa_config_module_1.EmpresaConfigModule,
        ],
        controllers: [cotizaciones_controller_1.CotizacionesController],
        providers: [cotizaciones_service_1.CotizacionesService, pdf_service_1.PdfService, email_service_1.EmailService],
    })
], CotizacionesModule);
//# sourceMappingURL=cotizaciones.module.js.map