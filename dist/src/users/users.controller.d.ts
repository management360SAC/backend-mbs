import { UsersService } from "./users.service";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "../users/dto/users.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    options(role?: string): Promise<{
        id: number;
        full_name: string;
    }[]>;
    getOne(id: number): Promise<{
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
    }>;
    create(dto: CreateUserDto): Promise<{
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
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
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
    }>;
    updatePassword(id: number, dto: UpdatePasswordDto): Promise<{
        ok: boolean;
    }>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    list(q?: string, role?: string, status?: "active" | "inactive", page?: string, pageSize?: string, sort?: string, order?: string): Promise<{
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
}
