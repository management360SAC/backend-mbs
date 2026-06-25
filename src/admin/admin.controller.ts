import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TenantProvisioningService } from "./tenant-provisioning.service";
import { CreateTenantDto } from "./dto/create-tenant.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly service: TenantProvisioningService) {}

  @Get("tenants/public")
  listTenantsPublic() {
    return this.service.listTenantsPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get("tenants")
  listTenants() {
    return this.service.listTenants();
  }

  @UseGuards(JwtAuthGuard)
  @Post("tenants")
  provision(@Body() dto: CreateTenantDto) {
    return this.service.provision(dto);
  }
}
