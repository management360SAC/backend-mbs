import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "dev_secret_change_me",
    });
  }

  async validate(payload: any) {
    // payload típico: { sub: userId, email, roles: [...] }
    const userId = Number(payload?.sub);
    if (!userId) throw new UnauthorizedException("Invalid token payload");

    // devuelve lo que irá a req.user
    const user = await this.usersService.getById(userId);
    return {
      id: user.id,
      email: user.email,
      roles: (user.userRoles ?? []).map((r) => r.role.code),
    };
  }
}
