import { UserRole } from "../users/user-role.entity";
import { RolePermission } from "./role-permission.entity";
export declare class Role {
    id: number;
    code: string;
    name: string;
    description: string | null;
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
    userRoles: UserRole[];
    rolePermissions: RolePermission[];
}
