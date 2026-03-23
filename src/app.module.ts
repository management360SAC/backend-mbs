import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { CoursesModule } from "./education/courses/courses.module";
import { EnrollmentsModule } from "./education/enrollments/enrollments.module";
import { MarketingModule } from "./marketing/marketing.module";
import { CotizacionesModule } from "./cotizaciones/cotizaciones.module";
import { EmpresaConfigModule } from "./empresa-config/empresa-config.module";
import { PaymentsModule } from "./payments/payments.module";
import { ActivityLogsModule } from "./activity-logs/activity-logs.module";
import { EmpresaClienteModule } from "./empresa-cliente/empresa-cliente.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: "mysql",
        host: cfg.get("DB_HOST"),
        port: Number(cfg.get("DB_PORT")),
        username: cfg.get("DB_USER"),
        password: cfg.get("DB_PASS"),
        database: cfg.get("DB_NAME"),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    MarketingModule,
    CoursesModule,
    EnrollmentsModule,
    CotizacionesModule,
    EmpresaConfigModule,
    PaymentsModule,
    ActivityLogsModule,
    EmpresaClienteModule,
  ],
})
export class AppModule {}
