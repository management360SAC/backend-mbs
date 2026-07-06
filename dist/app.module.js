"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const courses_module_1 = require("./education/courses/courses.module");
const enrollments_module_1 = require("./education/enrollments/enrollments.module");
const marketing_module_1 = require("./marketing/marketing.module");
const cotizaciones_module_1 = require("./cotizaciones/cotizaciones.module");
const empresa_config_module_1 = require("./empresa-config/empresa-config.module");
const payments_module_1 = require("./payments/payments.module");
const activity_logs_module_1 = require("./activity-logs/activity-logs.module");
const empresa_cliente_module_1 = require("./empresa-cliente/empresa-cliente.module");
const facebook_leads_module_1 = require("./facebook-leads/facebook-leads.module");
const web_form_module_1 = require("./web-form/web-form.module");
const prisma_module_1 = require("./prisma/prisma.module");
const tenant_module_1 = require("./tenant/tenant.module");
const tenant_middleware_1 = require("./tenant/tenant.middleware");
const admin_module_1 = require("./admin/admin.module");
const audit_module_1 = require("./audit/audit.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(tenant_middleware_1.TenantMiddleware)
            .exclude("auth/login", "admin/tenants/public", "facebook/webhook", "web-form/lead")
            .forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                { name: "short", ttl: 1000, limit: 20 },
                { name: "medium", ttl: 10000, limit: 100 },
                { name: "long", ttl: 60000, limit: 300 },
            ]),
            prisma_module_1.PrismaModule,
            tenant_module_1.TenantModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            marketing_module_1.MarketingModule,
            courses_module_1.CoursesModule,
            enrollments_module_1.EnrollmentsModule,
            cotizaciones_module_1.CotizacionesModule,
            empresa_config_module_1.EmpresaConfigModule,
            payments_module_1.PaymentsModule,
            activity_logs_module_1.ActivityLogsModule,
            empresa_cliente_module_1.EmpresaClienteModule,
            facebook_leads_module_1.FacebookLeadsModule,
            web_form_module_1.WebFormModule,
            admin_module_1.AdminModule,
            audit_module_1.AuditModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map