import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmpresaConfig } from "./EmpresaConfig";
import { EmpresaConfigService } from "./empresa-config.service";
import { EmpresaConfigController } from "./empresa-config.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaConfig])],
  controllers: [EmpresaConfigController],
  providers: [EmpresaConfigService],
  exports: [EmpresaConfigService, TypeOrmModule],
})
export class EmpresaConfigModule {}
