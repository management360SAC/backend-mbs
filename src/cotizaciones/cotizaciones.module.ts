import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cotizacion } from "./Cotizacion";
import { CotizacionDetalle } from "./CotizacionDetalle";
import { CotizacionEnvio } from "./CotizacionEnvio";
import { CotizacionesService } from "./cotizaciones.service";
import { CotizacionesController } from "./cotizaciones.controller";
import { PdfService } from "./pdf.service";
import { EmailService } from "./email.service";
import { EmpresaConfigModule } from "../empresa-config/empresa-config.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cotizacion, CotizacionDetalle, CotizacionEnvio]),
    EmpresaConfigModule,
  ],
  controllers: [CotizacionesController],
  providers: [CotizacionesService, PdfService, EmailService],
})
export class CotizacionesModule {}
