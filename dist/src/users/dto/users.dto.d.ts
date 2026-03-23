export declare class CreateUserDto {
    email: string;
    full_name: string;
    is_active?: boolean;
    password: string;
    role_ids?: number[];
}
export declare class UpdateUserDto {
    email?: string;
    full_name?: string;
    is_active?: boolean;
    role_ids?: number[];
}
export declare class UpdatePasswordDto {
    new_password: string;
}
