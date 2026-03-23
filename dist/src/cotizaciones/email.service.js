"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
let EmailService = EmailService_1 = class EmailService {
    logger = new common_1.Logger(EmailService_1.name);
    async sendEmail(smtpConfig, options) {
        if (!smtpConfig || !smtpConfig.host) {
            this.logger.warn("SMTP no configurado — email no enviado (modo simulado)");
            return { ok: true };
        }
        try {
            const nodemailer = require("nodemailer");
            const transporter = nodemailer.createTransport({
                host: smtpConfig.host,
                port: smtpConfig.port || 587,
                secure: (smtpConfig.port || 587) === 465,
                auth: {
                    user: smtpConfig.user,
                    pass: smtpConfig.pass,
                },
                tls: { rejectUnauthorized: false },
            });
            await transporter.sendMail({
                from: smtpConfig.from || smtpConfig.user,
                to: options.to,
                subject: options.subject,
                html: options.html,
                attachments: options.attachments?.map((a) => ({
                    filename: a.filename,
                    content: a.content,
                    contentType: a.contentType,
                })),
            });
            this.logger.log(`Email enviado a ${options.to}`);
            return { ok: true };
        }
        catch (err) {
            this.logger.error(`Error enviando email: ${err.message}`);
            return { ok: false, error: err.message };
        }
    }
    buildCotizacionHtml(opts) {
        return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .header { background: #2563eb; padding: 32px 40px; }
    .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #bfdbfe; margin: 6px 0 0; font-size: 14px; }
    .body { padding: 32px 40px; }
    .body p { color: #374151; line-height: 1.6; margin: 0 0 16px; }
    .info-box { background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .info-row { display: flex; justify-content: space-between; margin: 6px 0; }
    .info-label { color: #64748b; font-size: 13px; }
    .info-value { font-weight: 600; color: #1e293b; font-size: 13px; }
    .total-row { border-top: 2px solid #2563eb; padding-top: 12px; margin-top: 12px; }
    .total-label { color: #2563eb; font-weight: 700; }
    .total-value { color: #2563eb; font-weight: 700; font-size: 16px; }
    .note { color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${opts.empresaNombre}</h1>
      <p>Cotización ${opts.cotizacionNumero}</p>
    </div>
    <div class="body">
      <p>Estimado/a <strong>${opts.clienteNombre}</strong>,</p>
      <p>${opts.mensaje || "Adjunto encontrará nuestra cotización con los detalles de los productos/servicios solicitados. Por favor, revise el documento adjunto y no dude en contactarnos si tiene alguna pregunta."}</p>

      <div class="info-box">
        <div class="info-row">
          <span class="info-label">N° Cotización</span>
          <span class="info-value">${opts.cotizacionNumero}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Válida hasta</span>
          <span class="info-value">${opts.fechaVigencia}</span>
        </div>
        <div class="info-row total-row">
          <span class="info-label total-label">TOTAL</span>
          <span class="info-value total-value">${opts.moneda} ${opts.total}</span>
        </div>
      </div>

      <p>Quedamos a su disposición para cualquier consulta adicional.</p>
      <p>Atentamente,<br/><strong>${opts.empresaNombre}</strong></p>

      <p class="note">Este correo fue generado automáticamente. El PDF con el detalle completo de la cotización se encuentra adjunto.</p>
    </div>
  </div>
</body>
</html>
    `.trim();
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map