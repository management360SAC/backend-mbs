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

  /** Verificación del webhook por parte de Facebook */
  @Get("webhook")
  async verify(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") token: string,
    @Query("hub.challenge") challenge: string,
    @Res() res: Response,
  ) {
    // Env var tiene prioridad; si no, cae a lo guardado en BD
    const envToken = process.env.FB_VERIFY_TOKEN;
    const config = envToken ? null : await this.service.getConfig();
    const verifyToken = envToken ?? config?.fb_verify_token;

    this.logger.log(`Verificación webhook — mode: ${mode}, token recibido: ${token}, token esperado: ${verifyToken}`);

    if (mode === "subscribe" && token === verifyToken) {
      this.logger.log("Webhook de Facebook verificado correctamente");
      return res.status(200).send(challenge);
    }

    this.logger.warn(`Verificación fallida — token recibido: ${token}, esperado: ${verifyToken}`);
    return res.status(403).send("Forbidden");
  }

  /** Notificaciones de nuevos leads desde Facebook */
  @Post("webhook")
  @HttpCode(200)
  async receive(@Body() body: FbWebhookBody) {
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
