import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { Permission } from "./permission.entity";
export declare class PermissionsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    findAll(): Promise<Permission[]>;
    findByModule(): Promise<Record<string, Permission[]>>;
}
