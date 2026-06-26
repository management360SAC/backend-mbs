import { Module } from "@nestjs/common";
import { EmpresaConfigService } from "./empresa-config.service";
import { EmpresaConfigController } from "./empresa-config.controller";

@Module({
  controllers: [EmpresaConfigController],
  providers: [EmpresaConfigService],
  exports: [EmpresaConfigService],
})
export class EmpresaConfigModule {}
