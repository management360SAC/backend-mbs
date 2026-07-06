import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { User } from "./user.entity";
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
    private readonly tds;
    constructor(tds: TenantDataSourceService);
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
