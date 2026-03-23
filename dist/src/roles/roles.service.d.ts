import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
export declare class RolesService {
    private readonly rolesRepo;
    private readonly rolePermsRepo;
    private readonly permsRepo;
    constructor(rolesRepo: Repository<Role>, rolePermsRepo: Repository<RolePermission>, permsRepo: Repository<Permission>);
    private resolvePermissionIds;
    create(dto: CreateRoleDto): Promise<{
        userCount: number;
        permissions: Permission[];
        permission_keys: string[];
        id: number;
        code: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: import("../users/user-role.entity").UserRole[];
        rolePermissions: RolePermission[];
    }>;
    update(id: number, dto: UpdateRoleDto): Promise<{
        userCount: number;
        permissions: Permission[];
        permission_keys: string[];
        id: number;
        code: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: import("../users/user-role.entity").UserRole[];
        rolePermissions: RolePermission[];
    }>;
    findOne(id: number): Promise<Role>;
    findOneWithPermissions(id: number): Promise<{
        userCount: number;
        permissions: Permission[];
        permission_keys: string[];
        id: number;
        code: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: import("../users/user-role.entity").UserRole[];
        rolePermissions: RolePermission[];
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findAll(params?: {
        q?: string;
        page?: number;
        pageSize?: number;
    }): Promise<{
        data: {
            userCount: number;
            permissions: Permission[];
            id: number;
            code: string;
            name: string;
            description: string | null;
            isSystem: boolean;
            createdAt: Date;
            updatedAt: Date;
            userRoles: import("../users/user-role.entity").UserRole[];
            rolePermissions: RolePermission[];
        }[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
}
