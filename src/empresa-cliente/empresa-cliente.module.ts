import { Module } from "@nestjs/common";
import { EmpresaClienteService } from "./empresa-cliente.service";
import { EmpresaClienteController } from "./empresa-cliente.controller";

@Module({
  controllers: [EmpresaClienteController],
  providers: [EmpresaClienteService],
  exports: [EmpresaClienteService],
})
export class EmpresaClienteModule {}
