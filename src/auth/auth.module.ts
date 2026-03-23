import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "../users/users.module";
import { User } from "../users/user.entity";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const secret = cfg.getOrThrow<string>("JWT_SECRET");
        const expiresInStr = cfg.get<string>("JWT_EXPIRES_IN") ?? "1d";
        const expiresIn =
          expiresInStr.endsWith("d")
            ? Number(expiresInStr.replace("d", "")) * 24 * 60 * 60
            : expiresInStr.endsWith("h")
            ? Number(expiresInStr.replace("h", "")) * 60 * 60
            : expiresInStr.endsWith("m")
            ? Number(expiresInStr.replace("m", "")) * 60
            : Number(expiresInStr);
        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {} // ← DEBE exportar la clase