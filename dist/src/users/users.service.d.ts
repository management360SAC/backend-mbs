import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Role } from "../roles/role.entity";
import { UserRole } from "./user-role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "./dto/users.dto";
export type ListUsersArgs = {
    q?: string;
    role?: string;
    status?: "active" | "inactive";
    page: number;
    pageSize: number;
    sort: string;
    order: string;
};
export declare class UsersService {
    private readonly usersRepo;
    private readonly rolesRepo;
    private readonly userRolesRepo;
    private readonly rolePermsRepo;
    private readonly permsRepo;
    constructor(usersRepo: Repository<User>, rolesRepo: Repository<Role>, userRolesRepo: Repository<UserRole>, rolePermsRepo: Repository<RolePermission>, permsRepo: Repository<Permission>);
    findByEmailWithRolesAndPerms(email: string): Promise<User | null>;
    findByIdWithRolesAndPerms(id: number): Promise<User | null>;
    getById(id: number): Promise<User>;
    private replaceUserRoles;
    create(dto: CreateUserDto): Promise<User>;
    update(id: number, dto: UpdateUserDto): Promise<User>;
    updatePassword(id: number, dto: UpdatePasswordDto): Promise<{
        ok: boolean;
    }>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    list(args: ListUsersArgs): Promise<{
        data: {
            id: number;
            email: string;
            full_name: string;
            is_active: boolean;
            last_login_at: Date | null;
            created_at: Date;
            updated_at: Date;
            roles: {
                id: number;
                code: string;
                name: string;
                description: string | null;
            }[];
        }[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    listOptions(args: {
        role?: string;
    }): Promise<{
        id: number;
        full_name: string;
    }[]>;
}
