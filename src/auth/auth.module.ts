import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const secret = cfg.getOrThrow<string>("JWT_SECRET");
        const expiresInStr = cfg.get<string>("JWT_EXPIRES_IN") ?? "1d";
        const expiresIn = expiresInStr.endsWith("d")
          ? Number(expiresInStr.replace("d", "")) * 86400
          : expiresInStr.endsWith("h")
          ? Number(expiresInStr.replace("h", "")) * 3600
          : Number(expiresInStr);
        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
