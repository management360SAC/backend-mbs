import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(dto: LoginDto, req: any): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            isActive: true;
            roles: string[];
            tenantId: number;
            tenantSlug: string;
            tenantName: string;
        };
    }>;
    me(req: any): {
        id: any;
        email: any;
        fullName: any;
        roles: any;
        tenantId: any;
        tenantSlug: any;
    };
}
