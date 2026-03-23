import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            isActive: true;
            roles: string[];
        };
    }>;
    validateUser(userId: number): Promise<{
        id: number;
        email: string;
        fullName: string;
        roles: string[];
    }>;
}
