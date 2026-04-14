import { Injectable } from "@nestjs/common";
import { PDFDocument, rgb, RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import * as fs from "fs";
import * as path from "path";

export interface EmpresaInfo {
  nombre: string;
  ruc: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  website: string | null;
  logo_base64: string | null;
  terminos: string | null;
}

export interface ContactInfo {
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
}

export interface Cotizacion {
  numero: string;
  estado: string;
  moneda: string;
  subtotal: number;
  descuento_pct: number;
  descuento_monto: number;
  impuesto_pct: number;
  impuesto_monto: number;
  total: number;
  created_at: string | Date | null;
  terminos: string | null;
  observaciones?: string | null;
}

export interface CotizacionDetalle {
  orden: number;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  descuento_pct: number;
  subtotal: number;
}

// ── Color palette ─────────────────────────────────────────────────────────────
const NAVY      = rgb(2 / 255, 38 / 255, 89 / 255);
const WHITE     = rgb(1, 1, 1);
const TEXT_DARK = rgb(31 / 255, 43 / 255, 68 / 255);
const TEXT_MUTED = rgb(101 / 255, 116 / 255, 139 / 255);
const ROW_BG    = rgb(217 / 255, 221 / 255, 232 / 255);

@Injectable()
export class PdfService {
  async generateCotizacionPdf(
    cotizacion: Cotizacion,
    detalles: CotizacionDetalle[],
    empresa: EmpresaInfo,
    contact: ContactInfo | null,
  ): Promise<Buffer> {
    // ── Load template ──────────────────────────────────────────────────────────
    const templatePath = path.join(__dirname, "proforma-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.getPages()[0];
    const { height } = page.getSize();

    const arialBytes     = fs.readFileSync(path.join(__dirname, "arial.ttf"));
    const arialBoldBytes = fs.readFileSync(path.join(__dirname, "arial-bold.ttf"));
    const helv     = await pdfDoc.embedFont(arialBytes);
    const helvBold = await pdfDoc.embedFont(arialBoldBytes);

    // ── Helpers ────────────────────────────────────────────────────────────────
    /** Draw text, y measured from the TOP of the page */
    const T = (
      text: string,
      x: number,
      yTop: number,
      size: number,
      bold = false,
      color: RGB = TEXT_DARK,
    ) => {
      page.drawText(text, {
        x,
        y: height - yTop - size,
        size,
        font: bold ? helvBold : helv,
        color,
      });
    };

    /** Draw text right-aligned to xRight, y from top */
    const TR = (
      text: string,
      xRight: number,
      yTop: number,
      size: number,
      bold = false,
      color: RGB = TEXT_DARK,
    ) => {
      const f = bold ? helvBold : helv;
      const w = f.widthOfTextAtSize(text, size);
      T(text, xRight - w, yTop, size, bold, color);
    };

    /** Simple word-wrap: returns array of lines that fit within maxWidth */
    const wrap = (text: string, maxW: number, size: number, bold = false): string[] => {
      const f = bold ? helvBold : helv;
      const lines: string[] = [];
      let line = "";
      for (const word of text.split(" ")) {
        const test = line ? `${line} ${word}` : word;
        if (f.widthOfTextAtSize(test, size) <= maxW) {
          line = test;
        } else {
          if (line) lines.push(line);
          line = word;
        }
      }
      if (line) lines.push(line);
      return lines;
    };

    const fmtMoney = (v: number) =>
      Number(v).toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    const fmtDate = (d: string | Date | null) => {
      if (!d) return "—";
      return new Date(d).toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const estadoLabel: Record<string, string> = {
      BORRADOR:  "Borrador",
      GENERADA:  "Generada",
      ENVIADA:   "Enviada",
      ACEPTADA:  "Aceptada",
      RECHAZADA: "Rechazada",
      VENCIDA:   "Vencida",
    };

    // ── 1. Cotización número (bajo la línea que está debajo de "COTIZACIÓN") ────
    TR(cotizacion.numero, 565, 102, 11, true, NAVY);

    // ── 2. Estado value dentro del pill ────────────────────────────────────────
    T(estadoLabel[cotizacion.estado] ?? cotizacion.estado, 295, 144, 9, true, WHITE);

    // ── 3. Fecha value dentro del pill ─────────────────────────────────────────
    T(fmtDate(cotizacion.created_at), 455, 144, 9, false, WHITE);

    // ── 5. DIRIGIDO A — client info ────────────────────────────────────────────
    const clientName    = contact?.full_name || "";
    const clientCompany = contact?.company   || "";
    const clientEmail   = contact?.email     || "";
    const clientPhone   = contact?.phone ? `Tel: ${contact.phone}` : "";

    if (clientName)    T(clientName,    65, 222, 18, true,  TEXT_DARK);
    if (clientCompany) T(clientCompany, 65, 248, 11, false, TEXT_MUTED);
    if (clientEmail)   T(clientEmail,   65, 264, 11, false, TEXT_MUTED);
    if (clientPhone)   T(clientPhone,   65, 280, 11, false, TEXT_MUTED);

    // ── 6. Table rows ──────────────────────────────────────────────────────────
    const sorted   = [...detalles].sort((a, b) => a.orden - b.orden);
    const ROW_H    = 22;
    let tableYTop  = 352; // y from top where first data row starts

    for (let i = 0; i < sorted.length; i++) {
      const item = sorted[i];

      // Row background
      page.drawRectangle({
        x: 28,
        y: height - tableYTop - ROW_H,
        width: 542,
        height: ROW_H,
        color: ROW_BG,
      });

      const ty = tableYTop + 7; // text baseline from top
      T(  String(i + 1),                                               44,  ty, 9);
      T(  item.descripcion.substring(0, 68),                           70,  ty, 9);
      TR( Number(item.cantidad).toFixed(2),                           358,  ty, 9);
      TR( `${cotizacion.moneda} ${fmtMoney(Number(item.precio_unitario))}`, 452, ty, 9);
      TR( `${Number(item.descuento_pct).toFixed(1)}%`,                506,  ty, 9);
      TR( `${cotizacion.moneda} ${fmtMoney(Number(item.subtotal))}`,  566,  ty, 9, true);

      tableYTop += ROW_H;
    }

    // ── 7. RESUMEN values ──────────────────────────────────────────────────────
    // Labels (Subtotal, IGV, TOTAL) are already in the template as static text.
    // Only the numeric values are placed here.
    const cur = cotizacion.moneda;

    TR(`${cur} ${fmtMoney(Number(cotizacion.subtotal))}`,      566, 508, 11);
    TR(`${cur} ${fmtMoney(Number(cotizacion.impuesto_monto))}`, 566, 526, 11);
    TR(`${cur} ${fmtMoney(Number(cotizacion.total))}`,         566, 556, 16, true, NAVY);

    // ── 8. TÉRMINOS text ───────────────────────────────────────────────────────
    // Cubre el texto con caracteres mal codificados del template y reemplaza con texto correcto.
    page.drawRectangle({ x: 28, y: height - 690, width: 540, height: 80, color: WHITE });

    const terminos =
      cotizacion.terminos ||
      empresa.terminos ||
      "La presente cotización tiene una validez de 30 días desde su fecha de emisión. " +
      "Los precios incluyen IGV (18%). Forma de pago: 50% al inicio y 50% a la entrega.";

    const terminosLines = wrap(terminos, 530, 9);
    terminosLines.slice(0, 4).forEach((line, i) => {
      T(line, 35, 628 + i * 12, 9, false, TEXT_MUTED);
    });

    // ── 9. FOOTER: la plantilla ya tiene el diseño, no se modifican rectángulos ──

    // ── Return ─────────────────────────────────────────────────────────────────
    return Buffer.from(await pdfDoc.save());
  }
}
