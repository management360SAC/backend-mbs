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
    const expectedToken = (process.env.TOKEN_META ?? process.env.FB_VERIFY_TOKEN ?? "").trim();
    const receivedToken = (token ?? "").trim();

    this.logger.log(
      `Meta webhook verify — mode="${mode}" challenge="${challenge}" token_match=${receivedToken === expectedToken}`,
    );

    if (!expectedToken) {
      this.logger.error("FB_VERIFY_TOKEN no está configurado");
      return res.status(500).send("Server misconfiguration");
    }

    if (!challenge) {
      this.logger.warn("Meta no envió hub.challenge");
      return res.status(400).send("Bad Request");
    }

    if (mode === "subscribe" && receivedToken === expectedToken) {
      this.logger.log("Webhook Meta verificado OK");
      return res.status(200).contentType("text/plain").send(challenge);
    }

    this.logger.warn(
      `Verificación fallida — recibido: "${receivedToken}" (${receivedToken.length} chars) esperado: "${expectedToken}" (${expectedToken.length} chars)`,
    );
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
          const pageId = change.value.page_id ?? entry.id;
          this.service
            .processLeadgenId(change.value.leadgen_id, pageId)
            .catch((err) => this.logger.error(`Error procesando leadgen_id: ${err}`));
        }
      }
    }

    return { ok: true };
  }
}
