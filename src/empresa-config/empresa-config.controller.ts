import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { EmpresaConfigService } from "./empresa-config.service";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";
import { SendEmailDto } from "./dto/send-email.dto";

@UseGuards(JwtAuthGuard)
@Controller("empresa-config")
export class EmpresaConfigController {
  constructor(private readonly service: EmpresaConfigService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Patch()
  update(@Body() dto: UpdateEmpresaConfigDto) {
    return this.service.update(dto);
  }

  @Post("web-form-key/regenerate")
  regenerateWebFormKey() {
    return this.service.regenerateWebFormKey();
  }

  @Post("email")
  sendEmail(@Body() dto: SendEmailDto) {
    return this.service.sendEmail(dto);
  }
}
