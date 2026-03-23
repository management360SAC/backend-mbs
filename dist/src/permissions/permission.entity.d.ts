import { RolePermission } from "../roles/role-permission.entity";
export declare class Permission {
    id: number;
    code: string;
    module: string;
    action: string;
    description: string | null;
    createdAt: Date;
    rolePermissions: RolePermission[];
}
