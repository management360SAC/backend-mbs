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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (cfg) => ({
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
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map