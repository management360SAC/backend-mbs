import { Controller, Get, Post, Query, Body, Res, HttpCode, Logger } from "@nestjs/common";
import type { Response } from "express";
import { FacebookLeadsService } from "./facebook-leads.service";

interface FbWebhookChange {
  value?: {
    leadgen_id?: string;
    form_id?: string;
    page_id?: string;
  };
  field?: string;
}

interface FbWebhookEntry {
  id?: string;
  changes?: FbWebhookChange[];
}

interface FbWebhookBody {
  object?: string;
  entry?: FbWebhookEntry[];
}

@Controller("facebook")
export class FacebookLeadsController {
  private readonly logger = new Logger(FacebookLeadsController.name);

  constructor(private readonly service: FacebookLeadsService) {}

  /**
   * GET /facebook/webhook
   * Meta llama este endpoint para validar el webhook.
   * Debe responder HTTP 200 con el challenge exacto como texto plano.
   * No requiere autenticación — está excluido del globalPrefix y del TenantMiddleware.
   */
  @Get("webhook")
  verifyWebhook(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") token: string,
    @Query("hub.challenge") challenge: string,
    @Res() res: Response,
  ) {
    const expectedToken = process.env.FB_VERIFY_TOKEN ?? "";

    this.logger.log(
      `Meta webhook verify — mode="${mode}" token_match=${token === expectedToken} challenge="${challenge}"`,
    );

    if (!expectedToken) {
      this.logger.error("FB_VERIFY_TOKEN no está configurado en las variables de entorno");
      return res.status(500).send("Server misconfiguration");
    }

    if (mode === "subscribe" && token === expectedToken) {
      this.logger.log("Webhook Meta verificado correctamente");
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).send(challenge);
    }

    this.logger.warn(`Verificación Meta fallida — token recibido: "${token}", esperado: "${expectedToken}"`);
    return res.status(403).send("Forbidden");
  }

  /** POST /facebook/webhook — Notificaciones de nuevos leads */
  @Post("webhook")
  @HttpCode(200)
  async receiveWebhook(@Body() body: FbWebhookBody) {
    if (body?.object !== "page") return { ok: true };

    const entries = body.entry ?? [];
    for (const entry of entries) {
      for (const change of entry.changes ?? []) {
        if (change.field === "leadgen" && change.value?.leadgen_id) {
          this.service
            .processLeadgenId(change.value.leadgen_id)
            .catch((err) => this.logger.error(`Error procesando leadgen_id: ${err}`));
        }
      }
    }

    return { ok: true };
  }
}
