"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const pdf_lib_1 = require("pdf-lib");
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const NAVY = (0, pdf_lib_1.rgb)(2 / 255, 38 / 255, 89 / 255);
const WHITE = (0, pdf_lib_1.rgb)(1, 1, 1);
const TEXT_DARK = (0, pdf_lib_1.rgb)(31 / 255, 43 / 255, 68 / 255);
const TEXT_MUTED = (0, pdf_lib_1.rgb)(101 / 255, 116 / 255, 139 / 255);
const ROW_BG = (0, pdf_lib_1.rgb)(217 / 255, 221 / 255, 232 / 255);
let PdfService = class PdfService {
    async generateCotizacionPdf(cotizacion, detalles, empresa, contact) {
        const templatePath = path.join(__dirname, "proforma-template.pdf");
        const templateBytes = fs.readFileSync(templatePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(templateBytes);
        pdfDoc.registerFontkit(fontkit_1.default);
        const page = pdfDoc.getPages()[0];
        const { height } = page.getSize();
        const arialBytes = fs.readFileSync(path.join(__dirname, "arial.ttf"));
        const arialBoldBytes = fs.readFileSync(path.join(__dirname, "arial-bold.ttf"));
        const helv = await pdfDoc.embedFont(arialBytes);
        const helvBold = await pdfDoc.embedFont(arialBoldBytes);
        const T = (text, x, yTop, size, bold = false, color = TEXT_DARK) => {
            page.drawText(text, {
                x,
                y: height - yTop - size,
                size,
                font: bold ? helvBold : helv,
                color,
            });
        };
        const TR = (text, xRight, yTop, size, bold = false, color = TEXT_DARK) => {
            const f = bold ? helvBold : helv;
            const w = f.widthOfTextAtSize(text, size);
            T(text, xRight - w, yTop, size, bold, color);
        };
        const wrap = (text, maxW, size, bold = false) => {
            const f = bold ? helvBold : helv;
            const lines = [];
            let line = "";
            for (const word of text.split(" ")) {
                const test = line ? `${line} ${word}` : word;
                if (f.widthOfTextAtSize(test, size) <= maxW) {
                    line = test;
                }
                else {
                    if (line)
                        lines.push(line);
                    line = word;
                }
            }
            if (line)
                lines.push(line);
            return lines;
        };
        const fmtMoney = (v) => Number(v).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        const fmtDate = (d) => {
            if (!d)
                return "—";
            return new Date(d).toLocaleDateString("es-PE", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        };
        const estadoLabel = {
            BORRADOR: "Borrador",
            GENERADA: "Generada",
            ENVIADA: "Enviada",
            ACEPTADA: "Aceptada",
            RECHAZADA: "Rechazada",
            VENCIDA: "Vencida",
        };
        TR(cotizacion.numero, 565, 102, 11, true, NAVY);
        T(estadoLabel[cotizacion.estado] ?? cotizacion.estado, 295, 144, 9, true, WHITE);
        T(fmtDate(cotizacion.created_at), 455, 144, 9, false, WHITE);
        const clientName = contact?.full_name || "";
        const clientCompany = contact?.company || "";
        const clientEmail = contact?.email || "";
        const clientPhone = contact?.phone ? `Tel: ${contact.phone}` : "";
        if (clientName)
            T(clientName, 65, 222, 18, true, TEXT_DARK);
        if (clientCompany)
            T(clientCompany, 65, 248, 11, false, TEXT_MUTED);
        if (clientEmail)
            T(clientEmail, 65, 264, 11, false, TEXT_MUTED);
        if (clientPhone)
            T(clientPhone, 65, 280, 11, false, TEXT_MUTED);
        const sorted = [...detalles].sort((a, b) => a.orden - b.orden);
        const ROW_H = 22;
        let tableYTop = 352;
        for (let i = 0; i < sorted.length; i++) {
            const item = sorted[i];
            page.drawRectangle({
                x: 28,
                y: height - tableYTop - ROW_H,
                width: 542,
                height: ROW_H,
                color: ROW_BG,
            });
            const ty = tableYTop + 7;
            T(String(i + 1), 44, ty, 9);
            T(item.descripcion.substring(0, 68), 70, ty, 9);
            TR(Number(item.cantidad).toFixed(2), 358, ty, 9);
            TR(`${cotizacion.moneda} ${fmtMoney(Number(item.precio_unitario))}`, 452, ty, 9);
            TR(`${Number(item.descuento_pct).toFixed(1)}%`, 506, ty, 9);
            TR(`${cotizacion.moneda} ${fmtMoney(Number(item.subtotal))}`, 566, ty, 9, true);
            tableYTop += ROW_H;
        }
        const cur = cotizacion.moneda;
        TR(`${cur} ${fmtMoney(Number(cotizacion.subtotal))}`, 566, 508, 11);
        TR(`${cur} ${fmtMoney(Number(cotizacion.impuesto_monto))}`, 566, 526, 11);
        TR(`${cur} ${fmtMoney(Number(cotizacion.total))}`, 566, 556, 16, true, NAVY);
        page.drawRectangle({ x: 28, y: height - 690, width: 540, height: 80, color: WHITE });
        const terminos = cotizacion.terminos ||
            empresa.terminos ||
            "La presente cotización tiene una validez de 30 días desde su fecha de emisión. " +
                "Los precios incluyen IGV (18%). Forma de pago: 50% al inicio y 50% a la entrega.";
        const terminosLines = wrap(terminos, 530, 9);
        terminosLines.slice(0, 4).forEach((line, i) => {
            T(line, 35, 628 + i * 12, 9, false, TEXT_MUTED);
        });
        return Buffer.from(await pdfDoc.save());
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map