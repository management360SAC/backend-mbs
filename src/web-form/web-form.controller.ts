import { Body, Controller, Headers, HttpCode, Post } from "@nestjs/common";
import { WebFormService } from "./web-form.service";
import { SubmitFormDto } from "./dto/submit-form.dto";

@Controller("web-form")
export class WebFormController {
  constructor(private readonly service: WebFormService) {}

  /**
   * POST /web-form/lead
   * Endpoint público para formularios de contacto externos.
   * Autenticación: header X-Api-Key con la clave generada por empresa.
   */
  @Post("lead")
  @HttpCode(200)
  async submitLead(
    @Headers("x-api-key") apiKey: string,
    @Body() dto: SubmitFormDto,
  ) {
    await this.service.submitLead(apiKey, dto);
    return { ok: true, message: "Lead recibido correctamente" };
  }
}
