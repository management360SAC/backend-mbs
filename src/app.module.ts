import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
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
import { FacebookLeadsModule } from "./facebook-leads/facebook-leads.module";
import { WebFormModule } from "./web-form/web-form.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TenantModule } from "./tenant/tenant.module";
import { TenantMiddleware } from "./tenant/tenant.middleware";
import { AdminModule } from "./admin/admin.module";
import { AuditModule } from "./audit/audit.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      { name: "short",  ttl: 1000,  limit: 20  },
      { name: "medium", ttl: 10000, limit: 100 },
      { name: "long",   ttl: 60000, limit: 300 },
    ]),
    PrismaModule,
    TenantModule,
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
    FacebookLeadsModule,
    WebFormModule,
    AdminModule,
    AuditModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude("auth/login", "admin/tenants/public", "facebook/webhook", "web-form/lead")
      .forRoutes("*");
  }
}
