export interface SmtpConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
}
export interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    attachments?: {
        filename: string;
        content: Buffer;
        contentType: string;
    }[];
}
export declare class EmailService {
    private readonly logger;
    sendEmail(smtpConfig: SmtpConfig | null, options: SendEmailOptions): Promise<{
        ok: boolean;
        error?: string;
    }>;
    buildCotizacionHtml(opts: {
        empresaNombre: string;
        cotizacionNumero: string;
        clienteNombre: string;
        mensaje: string;
        total: string;
        moneda: string;
        fechaVigencia: string;
    }): string;
}
