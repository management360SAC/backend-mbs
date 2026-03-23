import { Role } from "./role.entity";
import { Permission } from "../permissions/permission.entity";
export declare class RolePermission {
    roleId: number;
    permissionId: number;
    createdAt: Date;
    role: Role;
    permission: Permission;
}
