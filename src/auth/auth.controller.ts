import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Request } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // Estricto: máx 10 intentos por minuto por IP
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto, @Req() req: any) {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ?? req.ip;
    const userAgent = req.headers["user-agent"] as string | undefined;
    return this.auth.login(dto.email, dto.password, dto.tenantSlug, ip, userAgent);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  me(@Req() req: any) {
    const { id, email, fullName, roles, tenantId, tenantSlug } = req.user;
    return { id, email, fullName, roles, tenantId, tenantSlug };
  }
}
