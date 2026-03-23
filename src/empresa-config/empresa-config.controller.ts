import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { EmpresaConfigService } from "./empresa-config.service";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";

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
}
