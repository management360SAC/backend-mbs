import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TenantProvisioningService } from "./tenant-provisioning.service";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { CreateUserDto } from "../users/dto/users.dto";
import { UpdateEmpresaConfigDto } from "../empresa-config/dto/update-empresa-config.dto";

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

  @UseGuards(JwtAuthGuard)
  @Get("tenants/:slug/users")
  listTenantUsers(@Param("slug") slug: string) {
    return this.service.listTenantUsers(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post("tenants/:slug/users")
  createTenantUser(@Param("slug") slug: string, @Body() dto: CreateUserDto) {
    return this.service.createTenantUser(slug, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("tenants/:slug/config")
  getTenantConfig(@Param("slug") slug: string) {
    return this.service.getTenantConfig(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("tenants/:slug/config")
  updateTenantConfig(@Param("slug") slug: string, @Body() dto: UpdateEmpresaConfigDto) {
    return this.service.updateTenantConfig(slug, dto);
  }
}
