import { Injectable } from "@nestjs/common";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { Permission } from "./permission.entity";

@Injectable()
export class PermissionsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async findAll() {
    const repo = await this.tds.getRepository(Permission);
    return repo.find({ order: { module: "ASC", action: "ASC" } });
  }

  async findByModule() {
    const permissions = await this.findAll();
    return permissions.reduce(
      (acc, perm) => {
        if (!acc[perm.module]) acc[perm.module] = [];
        acc[perm.module].push(perm);
        return acc;
      },
      {} as Record<string, Permission[]>,
    );
  }
}
