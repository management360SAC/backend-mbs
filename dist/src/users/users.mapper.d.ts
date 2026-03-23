import { User } from "./user.entity";
export declare function toUserResponse(u: User): {
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
};
