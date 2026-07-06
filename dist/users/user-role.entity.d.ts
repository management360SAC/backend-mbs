import { User } from "./user.entity";
import { Role } from "../roles/role.entity";
export declare class UserRole {
    userId: number;
    roleId: number;
    createdAt: Date;
    user: User;
    role: Role;
}
