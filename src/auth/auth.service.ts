import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // 1. Buscar usuario por email con sus roles
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar si está activo
    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // 3. Verificar contraseña (nota: usa passwordHash, NO password)
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Extraer roles
    const roles = user.userRoles?.map(ur => ur.role?.code) || [];

    // 5. Generar token JWT
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: roles,
    };

    const accessToken = this.jwtService.sign(payload);

    // 6. Actualizar last_login_at
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    // 7. Retornar token y datos del usuario
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isActive: user.isActive,
        roles: roles,
      },
    };
  }

  async validateUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Usuario no encontrado o inactivo');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.userRoles?.map(ur => ur.role?.code) || [],
    };
  }
}