import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmpresaCliente } from "./EmpresaCliente";
import { EmpresaContacto } from "./EmpresaContacto";
import { EmpresaClienteService } from "./empresa-cliente.service";
import { EmpresaClienteController } from "./empresa-cliente.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaCliente, EmpresaContacto])],
  controllers: [EmpresaClienteController],
  providers: [EmpresaClienteService],
  exports: [EmpresaClienteService, TypeOrmModule],
})
export class EmpresaClienteModule {}
