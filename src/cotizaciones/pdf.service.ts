import { Injectable } from "@nestjs/common";
import { Cotizacion } from "./Cotizacion";
import { CotizacionDetalle } from "./CotizacionDetalle";

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

// ─── Paleta MBS ──────────────────────────────────────────────────────────────
const NAVY       = "#0f2267";   // azul marino del logo
const NAVY_LIGHT = "#1a3380";   // un tono más claro para detalles
const ACCENT     = "#c8a84b";   // dorado académico (contraste elegante)
const DARK       = "#1e293b";   // texto principal
const MUTED      = "#64748b";   // texto secundario
const SUBTLE_BG  = "#f5f7fc";   // fondo alternado de filas (muy tenue)
const BORDER     = "#dde3f0";   // líneas separadoras
const WHITE      = "#ffffff";

@Injectable()
export class PdfService {
  async generateCotizacionPdf(
    cotizacion: Cotizacion,
    detalles: CotizacionDetalle[],
    empresa: EmpresaInfo,
    contact: ContactInfo | null,
  ): Promise<Buffer> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const PdfPrinter = require("pdfmake");

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };

    const printer = new PdfPrinter(fonts);

    const fmtMoney = (v: number) =>
      Number(v).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const fmtDate = (d: string | Date | null) => {
      if (!d) return "—";
      return new Date(d).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const estadoLabels: Record<string, string> = {
      BORRADOR: "Borrador",
      GENERADA: "Generada",
      ENVIADA: "Enviada",
      ACEPTADA: "Aceptada",
      RECHAZADA: "Rechazada",
      VENCIDA: "Vencida",
    };

    // ─── Filas de la tabla de productos ────────────────────────────────────
    const sortedDetalles = [...detalles].sort((a, b) => a.orden - b.orden);

    const tableRows: any[] = [
      // Header row
      [
        { text: "#",            style: "thCell", alignment: "center" },
        { text: "Descripción",  style: "thCell" },
        { text: "Cant.",        style: "thCell", alignment: "right" },
        { text: "P. Unitario",  style: "thCell", alignment: "right" },
        { text: "Desc. %",      style: "thCell", alignment: "right" },
        { text: "Subtotal",     style: "thCell", alignment: "right" },
      ],
    ];

    sortedDetalles.forEach((d, i) => {
      const isEven = i % 2 === 0;
      const cellStyle = isEven ? "tdCellAlt" : "tdCell";
      tableRows.push([
        { text: String(i + 1), style: cellStyle, alignment: "center", color: MUTED },
        { text: d.descripcion,  style: cellStyle, color: DARK },
        { text: Number(d.cantidad).toFixed(2),              style: cellStyle, alignment: "right", color: DARK },
        { text: `${cotizacion.moneda} ${fmtMoney(Number(d.precio_unitario))}`, style: cellStyle, alignment: "right", color: DARK },
        { text: `${Number(d.descuento_pct).toFixed(1)}%`,   style: cellStyle, alignment: "right", color: MUTED },
        { text: `${cotizacion.moneda} ${fmtMoney(Number(d.subtotal))}`, style: cellStyle, alignment: "right", bold: true, color: DARK },
      ]);
    });

    // ─── Columna izquierda del header: logo + datos empresa ────────────────
    const logoStack: any[] = [];
    if (empresa.logo_base64) {
      try {
        // El logo tiene fondo navy — va directo, sin marco
        logoStack.push({ image: empresa.logo_base64, width: 64, margin: [0, 0, 0, 0] });
      } catch { /* skip */ }
    }

    const empresaInfoLines: any[] = [
      { text: empresa.nombre, fontSize: 13, bold: true, color: WHITE, margin: [0, 0, 0, 2] },
    ];
    if (empresa.ruc)      empresaInfoLines.push({ text: `RUC: ${empresa.ruc}`,           fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
    if (empresa.direccion) empresaInfoLines.push({ text: empresa.direccion,               fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
    if (empresa.telefono)  empresaInfoLines.push({ text: `Tel: ${empresa.telefono}`,      fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
    if (empresa.email)     empresaInfoLines.push({ text: empresa.email,                   fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });

    // ─── Columna derecha del header: número de cotización ──────────────────
    const cotNumStack: any[] = [
      { text: "COTIZACIÓN", fontSize: 8, bold: true, color: ACCENT, characterSpacing: 1.5, margin: [0, 0, 0, 4] },
      { text: cotizacion.numero, fontSize: 18, bold: true, color: WHITE, margin: [0, 0, 0, 6] },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 110, y2: 0, lineWidth: 0.5, lineColor: ACCENT }],
        margin: [0, 0, 0, 6],
      },
      { text: `Estado: ${estadoLabels[cotizacion.estado] ?? cotizacion.estado}`, fontSize: 8, color: "#b8c8ef" },
      { text: `Fecha: ${fmtDate(cotizacion.created_at)}`, fontSize: 8, color: "#b8c8ef", margin: [0, 3, 0, 0] },
      cotizacion.fecha_vigencia
        ? { text: `Válida hasta: ${fmtDate(cotizacion.fecha_vigencia)}`, fontSize: 8, color: "#b8c8ef", margin: [0, 3, 0, 0] }
        : null,
    ].filter(Boolean);

    // ─── Separador de sección ───────────────────────────────────────────────
    const sectionDivider = {
      canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: BORDER }],
      margin: [0, 0, 0, 12],
    };

    const sectionLabel = (text: string) => ({
      text: text.toUpperCase(),
      fontSize: 7,
      bold: true,
      color: NAVY,
      characterSpacing: 1.2,
      margin: [0, 0, 0, 6],
    });

    // ─── Bloque datos del cliente ───────────────────────────────────────────
    const clienteRows: any[] = [];
    if (contact) {
      clienteRows.push(
        { text: contact.full_name, fontSize: 11, bold: true, color: DARK, margin: [0, 0, 0, 3] },
      );
      if (contact.company) clienteRows.push({ text: contact.company, fontSize: 8.5, color: MUTED, margin: [0, 0, 0, 2] });
      if (contact.email)   clienteRows.push({ text: contact.email,   fontSize: 8.5, color: MUTED, margin: [0, 0, 0, 2] });
      if (contact.phone)   clienteRows.push({ text: `Tel: ${contact.phone}`, fontSize: 8.5, color: MUTED });
    } else {
      clienteRows.push({ text: "Cliente no especificado", fontSize: 9, color: MUTED });
    }

    // ─── Totales ────────────────────────────────────────────────────────────
    const totalRows: any[][] = [
      [
        { text: "Subtotal", fontSize: 9, color: MUTED,  border: [false, false, false, false], margin: [0, 3, 0, 3] },
        { text: `${cotizacion.moneda} ${fmtMoney(Number(cotizacion.subtotal))}`, fontSize: 9, alignment: "right", color: DARK, border: [false, false, false, false], margin: [0, 3, 0, 3] },
      ],
    ];

    if (Number(cotizacion.descuento_monto) > 0) {
      totalRows.push([
        { text: `Descuento (${Number(cotizacion.descuento_pct).toFixed(1)}%)`, fontSize: 9, color: MUTED, border: [false, false, false, false], margin: [0, 0, 0, 3] },
        { text: `− ${cotizacion.moneda} ${fmtMoney(Number(cotizacion.descuento_monto))}`, fontSize: 9, alignment: "right", color: "#e11d48", border: [false, false, false, false], margin: [0, 0, 0, 3] },
      ]);
    }

    totalRows.push([
      { text: `IGV (${Number(cotizacion.impuesto_pct).toFixed(0)}%)`, fontSize: 9, color: MUTED, border: [false, false, false, false], margin: [0, 0, 0, 6] },
      { text: `${cotizacion.moneda} ${fmtMoney(Number(cotizacion.impuesto_monto))}`, fontSize: 9, alignment: "right", color: DARK, border: [false, false, false, false], margin: [0, 0, 0, 6] },
    ]);

    // Fila total con línea superior
    totalRows.push([
      {
        text: "TOTAL",
        fontSize: 12,
        bold: true,
        color: NAVY,
        border: [false, true, false, false],
        borderColor: [[null, NAVY, null, null]],
        margin: [0, 8, 0, 4],
      },
      {
        text: `${cotizacion.moneda} ${fmtMoney(Number(cotizacion.total))}`,
        fontSize: 14,
        bold: true,
        alignment: "right",
        color: NAVY,
        border: [false, true, false, false],
        borderColor: [[null, NAVY, null, null]],
        margin: [0, 8, 0, 4],
      },
    ]);

    // ─── Documento ──────────────────────────────────────────────────────────
    const docDefinition: any = {
      defaultStyle: { font: "Helvetica", fontSize: 9, color: DARK },
      pageSize: "A4",
      pageMargins: [40, 40, 40, 50],

      footer: (currentPage: number, pageCount: number) => ({
        columns: [
          {
            stack: [
              { canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: BORDER }] },
              {
                text: empresa.nombre + (empresa.website ? `  ·  ${empresa.website}` : "") + (empresa.email ? `  ·  ${empresa.email}` : ""),
                fontSize: 7,
                color: MUTED,
                margin: [0, 6, 0, 0],
              },
            ],
            margin: [40, 8, 0, 0],
          },
          {
            text: `Página ${currentPage} / ${pageCount}`,
            alignment: "right",
            fontSize: 7,
            color: MUTED,
            margin: [0, 20, 40, 0],
          },
        ],
      }),

      content: [
        // ═══════════════════════════════════════════════════════════════════
        // HEADER — Banda navy completa
        // ═══════════════════════════════════════════════════════════════════
        {
          table: {
            widths: ["*", "auto"],
            body: [
              [
                // Columna izquierda: logo + datos empresa
                {
                  columns: [
                    ...(empresa.logo_base64
                      ? [{
                          image: empresa.logo_base64,
                          width: 60,
                          margin: [0, 0, 14, 0],
                        }]
                      : []),
                    { stack: empresaInfoLines, margin: [0, 4, 0, 0] },
                  ],
                  border: [false, false, false, false],
                  fillColor: NAVY,
                  margin: [12, 14, 8, 14],
                },
                // Columna derecha: número de cotización
                {
                  stack: cotNumStack,
                  alignment: "right",
                  border: [false, false, false, false],
                  fillColor: NAVY,
                  margin: [8, 14, 14, 14],
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            paddingLeft: () => 0,
            paddingRight: () => 0,
            paddingTop: () => 0,
            paddingBottom: () => 0,
          },
          margin: [0, 0, 0, 20],
        },

        // ═══════════════════════════════════════════════════════════════════
        // ASUNTO + CLIENTE
        // ═══════════════════════════════════════════════════════════════════
        {
          columns: [
            // Asunto
            {
              stack: [
                sectionLabel("Asunto"),
                { text: cotizacion.titulo, fontSize: 11, bold: true, color: DARK },
              ],
              width: "55%",
            },
            { width: 20, text: "" },
            // Cliente
            {
              stack: [
                sectionLabel("Dirigido a"),
                ...clienteRows,
              ],
              width: "*",
            },
          ],
          margin: [0, 0, 0, 20],
        },

        sectionDivider,

        // ═══════════════════════════════════════════════════════════════════
        // TABLA DE PRODUCTOS
        // ═══════════════════════════════════════════════════════════════════
        sectionLabel("Detalle de productos / servicios"),
        {
          table: {
            headerRows: 1,
            widths: [20, "*", 42, 68, 38, 66],
            body: tableRows,
          },
          layout: {
            hLineWidth: (i: number, node: any) =>
              i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
            vLineWidth: () => 0,
            hLineColor: (i: number) =>
              i === 0 || i === 1 ? NAVY : BORDER,
            fillColor: (row: number) =>
              row === 0 ? NAVY : row % 2 === 0 ? SUBTLE_BG : null,
            paddingLeft:   () => 6,
            paddingRight:  () => 6,
            paddingTop:    () => 5,
            paddingBottom: () => 5,
          },
          margin: [0, 0, 0, 20],
        },

        // ═══════════════════════════════════════════════════════════════════
        // TOTALES
        // ═══════════════════════════════════════════════════════════════════
        {
          columns: [
            { width: "*", text: "" },
            {
              width: 210,
              stack: [
                sectionLabel("Resumen"),
                {
                  table: {
                    widths: ["*", "auto"],
                    body: totalRows,
                  },
                  layout: {
                    hLineWidth: (i: number, node: any) =>
                      i === node.table.body.length - 1 ? 1.5 : 0,
                    vLineWidth: () => 0,
                    hLineColor: () => NAVY,
                    paddingTop: () => 2,
                    paddingBottom: () => 2,
                  },
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // ═══════════════════════════════════════════════════════════════════
        // OBSERVACIONES
        // ═══════════════════════════════════════════════════════════════════
        ...(cotizacion.observaciones
          ? [
              sectionDivider,
              sectionLabel("Observaciones"),
              { text: cotizacion.observaciones, fontSize: 8.5, color: DARK, margin: [0, 0, 0, 16] },
            ]
          : []),

        // ═══════════════════════════════════════════════════════════════════
        // TÉRMINOS Y CONDICIONES
        // ═══════════════════════════════════════════════════════════════════
        sectionDivider,
        sectionLabel("Términos y condiciones"),
        {
          text:
            cotizacion.terminos ||
            empresa.terminos ||
            "La presente cotización tiene una validez de 30 días desde su fecha de emisión. Los precios indicados incluyen IGV.",
          fontSize: 8,
          color: MUTED,
        },
      ],

      styles: {
        thCell: {
          fontSize: 8,
          bold: true,
          color: WHITE,
        },
        tdCell: {
          fontSize: 8.5,
        },
        tdCellAlt: {
          fontSize: 8.5,
          fillColor: SUBTLE_BG,
        },
      },
    };

    return new Promise((resolve, reject) => {
      try {
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const chunks: Buffer[] = [];
        pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk));
        pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
        pdfDoc.on("error", reject);
        pdfDoc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}
