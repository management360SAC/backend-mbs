import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { TenantModule } from "../tenant/tenant.module";
import { TenantProvisioningService } from "./tenant-provisioning.service";
import { AdminController } from "./admin.controller";

@Module({
  imports: [PrismaModule, TenantModule],
  controllers: [AdminController],
  providers: [TenantProvisioningService],
})
export class AdminModule {}
