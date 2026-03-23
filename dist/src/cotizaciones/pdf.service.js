"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const NAVY = "#0f2267";
const NAVY_LIGHT = "#1a3380";
const ACCENT = "#c8a84b";
const DARK = "#1e293b";
const MUTED = "#64748b";
const SUBTLE_BG = "#f5f7fc";
const BORDER = "#dde3f0";
const WHITE = "#ffffff";
let PdfService = class PdfService {
    async generateCotizacionPdf(cotizacion, detalles, empresa, contact) {
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
        const fmtMoney = (v) => Number(v).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const fmtDate = (d) => {
            if (!d)
                return "—";
            return new Date(d).toLocaleDateString("es-PE", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        };
        const estadoLabels = {
            BORRADOR: "Borrador",
            GENERADA: "Generada",
            ENVIADA: "Enviada",
            ACEPTADA: "Aceptada",
            RECHAZADA: "Rechazada",
            VENCIDA: "Vencida",
        };
        const sortedDetalles = [...detalles].sort((a, b) => a.orden - b.orden);
        const tableRows = [
            [
                { text: "#", style: "thCell", alignment: "center" },
                { text: "Descripción", style: "thCell" },
                { text: "Cant.", style: "thCell", alignment: "right" },
                { text: "P. Unitario", style: "thCell", alignment: "right" },
                { text: "Desc. %", style: "thCell", alignment: "right" },
                { text: "Subtotal", style: "thCell", alignment: "right" },
            ],
        ];
        sortedDetalles.forEach((d, i) => {
            const isEven = i % 2 === 0;
            const cellStyle = isEven ? "tdCellAlt" : "tdCell";
            tableRows.push([
                { text: String(i + 1), style: cellStyle, alignment: "center", color: MUTED },
                { text: d.descripcion, style: cellStyle, color: DARK },
                { text: Number(d.cantidad).toFixed(2), style: cellStyle, alignment: "right", color: DARK },
                { text: `${cotizacion.moneda} ${fmtMoney(Number(d.precio_unitario))}`, style: cellStyle, alignment: "right", color: DARK },
                { text: `${Number(d.descuento_pct).toFixed(1)}%`, style: cellStyle, alignment: "right", color: MUTED },
                { text: `${cotizacion.moneda} ${fmtMoney(Number(d.subtotal))}`, style: cellStyle, alignment: "right", bold: true, color: DARK },
            ]);
        });
        const logoStack = [];
        if (empresa.logo_base64) {
            try {
                logoStack.push({ image: empresa.logo_base64, width: 64, margin: [0, 0, 0, 0] });
            }
            catch { }
        }
        const empresaInfoLines = [
            { text: empresa.nombre, fontSize: 13, bold: true, color: WHITE, margin: [0, 0, 0, 2] },
        ];
        if (empresa.ruc)
            empresaInfoLines.push({ text: `RUC: ${empresa.ruc}`, fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
        if (empresa.direccion)
            empresaInfoLines.push({ text: empresa.direccion, fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
        if (empresa.telefono)
            empresaInfoLines.push({ text: `Tel: ${empresa.telefono}`, fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
        if (empresa.email)
            empresaInfoLines.push({ text: empresa.email, fontSize: 7.5, color: "#b8c8ef", margin: [0, 1, 0, 0] });
        const cotNumStack = [
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
        const sectionDivider = {
            canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: BORDER }],
            margin: [0, 0, 0, 12],
        };
        const sectionLabel = (text) => ({
            text: text.toUpperCase(),
            fontSize: 7,
            bold: true,
            color: NAVY,
            characterSpacing: 1.2,
            margin: [0, 0, 0, 6],
        });
        const clienteRows = [];
        if (contact) {
            clienteRows.push({ text: contact.full_name, fontSize: 11, bold: true, color: DARK, margin: [0, 0, 0, 3] });
            if (contact.company)
                clienteRows.push({ text: contact.company, fontSize: 8.5, color: MUTED, margin: [0, 0, 0, 2] });
            if (contact.email)
                clienteRows.push({ text: contact.email, fontSize: 8.5, color: MUTED, margin: [0, 0, 0, 2] });
            if (contact.phone)
                clienteRows.push({ text: `Tel: ${contact.phone}`, fontSize: 8.5, color: MUTED });
        }
        else {
            clienteRows.push({ text: "Cliente no especificado", fontSize: 9, color: MUTED });
        }
        const totalRows = [
            [
                { text: "Subtotal", fontSize: 9, color: MUTED, border: [false, false, false, false], margin: [0, 3, 0, 3] },
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
        const docDefinition = {
            defaultStyle: { font: "Helvetica", fontSize: 9, color: DARK },
            pageSize: "A4",
            pageMargins: [40, 40, 40, 50],
            footer: (currentPage, pageCount) => ({
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
                {
                    table: {
                        widths: ["*", "auto"],
                        body: [
                            [
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
                {
                    columns: [
                        {
                            stack: [
                                sectionLabel("Asunto"),
                                { text: cotizacion.titulo, fontSize: 11, bold: true, color: DARK },
                            ],
                            width: "55%",
                        },
                        { width: 20, text: "" },
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
                sectionLabel("Detalle de productos / servicios"),
                {
                    table: {
                        headerRows: 1,
                        widths: [20, "*", 42, 68, 38, 66],
                        body: tableRows,
                    },
                    layout: {
                        hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
                        vLineWidth: () => 0,
                        hLineColor: (i) => i === 0 || i === 1 ? NAVY : BORDER,
                        fillColor: (row) => row === 0 ? NAVY : row % 2 === 0 ? SUBTLE_BG : null,
                        paddingLeft: () => 6,
                        paddingRight: () => 6,
                        paddingTop: () => 5,
                        paddingBottom: () => 5,
                    },
                    margin: [0, 0, 0, 20],
                },
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
                                        hLineWidth: (i, node) => i === node.table.body.length - 1 ? 1.5 : 0,
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
                ...(cotizacion.observaciones
                    ? [
                        sectionDivider,
                        sectionLabel("Observaciones"),
                        { text: cotizacion.observaciones, fontSize: 8.5, color: DARK, margin: [0, 0, 0, 16] },
                    ]
                    : []),
                sectionDivider,
                sectionLabel("Términos y condiciones"),
                {
                    text: cotizacion.terminos ||
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
                const chunks = [];
                pdfDoc.on("data", (chunk) => chunks.push(chunk));
                pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
                pdfDoc.on("error", reject);
                pdfDoc.end();
            }
            catch (err) {
                reject(err);
            }
        });
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map