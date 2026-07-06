import { UserRole } from "./user-role.entity";
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    fullName: string;
    isActive: boolean;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userRoles: UserRole[];
}
