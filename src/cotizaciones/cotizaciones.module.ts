import { Module } from "@nestjs/common";
import { CotizacionesService } from "./cotizaciones.service";
import { CotizacionesController } from "./cotizaciones.controller";
import { PdfService } from "./pdf.service";
import { EmailService } from "./email.service";

@Module({
  controllers: [CotizacionesController],
  providers: [CotizacionesService, PdfService, EmailService],
})
export class CotizacionesModule {}
