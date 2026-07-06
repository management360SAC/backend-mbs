"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const permission_entity_1 = require("./permission.entity");
let PermissionsService = class PermissionsService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async findAll() {
        const repo = await this.tds.getRepository(permission_entity_1.Permission);
        return repo.find({ order: { module: "ASC", action: "ASC" } });
    }
    async findByModule() {
        const permissions = await this.findAll();
        return permissions.reduce((acc, perm) => {
            if (!acc[perm.module])
                acc[perm.module] = [];
            acc[perm.module].push(perm);
            return acc;
        }, {});
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map