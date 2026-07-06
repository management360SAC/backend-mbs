"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TenantDataSourceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantDataSourceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tenant_context_1 = require("./tenant.context");
const tenant_entities_1 = require("./tenant-entities");
let TenantDataSourceService = TenantDataSourceService_1 = class TenantDataSourceService {
    logger = new common_1.Logger(TenantDataSourceService_1.name);
    pool = new Map();
    async getDataSource(tenant) {
        const info = tenant ?? tenant_context_1.TenantContext.getOrFail();
        const key = info.slug;
        const existing = this.pool.get(key);
        if (existing) {
            if (!existing.isInitialized)
                await existing.initialize();
            return existing;
        }
        const ds = new typeorm_1.DataSource({
            type: "mysql",
            host: info.dbHost,
            port: info.dbPort,
            username: info.dbUser,
            password: info.dbPass,
            database: info.dbName,
            entities: tenant_entities_1.TENANT_ENTITIES,
            synchronize: false,
            poolSize: 5,
        });
        await ds.initialize();
        this.pool.set(key, ds);
        this.logger.log(`DataSource initialized for tenant: ${key} → ${info.dbName}`);
        return ds;
    }
    async getRepository(entity, tenant) {
        const ds = await this.getDataSource(tenant);
        return ds.getRepository(entity);
    }
    async onModuleDestroy() {
        for (const [key, ds] of this.pool.entries()) {
            if (ds.isInitialized) {
                await ds.destroy();
                this.logger.log(`DataSource destroyed: ${key}`);
            }
        }
        this.pool.clear();
    }
};
exports.TenantDataSourceService = TenantDataSourceService;
exports.TenantDataSourceService = TenantDataSourceService = TenantDataSourceService_1 = __decorate([
    (0, common_1.Injectable)()
], TenantDataSourceService);
//# sourceMappingURL=tenant-datasource.service.js.map