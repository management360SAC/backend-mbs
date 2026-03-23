import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(dto: CreateRoleDto): Promise<{
        userCount: number;
        permissions: import("../permissions/permission.entity").Permission[];
        permission_keys: string[];
        id: number;
        code: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: import("../users/user-role.entity").UserRole[];
        rolePermissions: import("./role-permission.entity").RolePermission[];
    }>;
    findAll(q?: string, page?: string, pageSize?: string): Promise<{
        data: {
            userCount: number;
            permissions: import("../permissions/permission.entity").Permission[];
            id: number;
            code: string;
            name: string;
            description: string | null;
            isSystem: boolean;
            createdAt: Date;
            updatedAt: Date;
            userRoles: import("../users/user-role.entity").UserRole[];
            rolePermissions: import("./role-permission.entity").RolePermission[];
        }[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        userCount: number;
        permissions: import("../permissions/permission.entity").Permission[];
        permission_keys: string[];
        id: number;
        code: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: import("../users/user-role.entity").UserRole[];
        rolePermissions: import("./role-permission.entity").RolePermission[];
    }>;
    update(id: number, dto: UpdateRoleDto): Promise<{
        userCount: number;
        permissions: import("../permissions/permission.entity").Permission[];
        permission_keys: string[];
        id: number;
        code: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: import("../users/user-role.entity").UserRole[];
        rolePermissions: import("./role-permission.entity").RolePermission[];
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
