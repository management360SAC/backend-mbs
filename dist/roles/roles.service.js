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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tenant_datasource_service_1 = require("../tenant/tenant-datasource.service");
const role_entity_1 = require("./role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
let RolesService = class RolesService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async resolvePermissionIds(input) {
        if (input.permission_ids !== undefined)
            return input.permission_ids;
        if (input.permission_keys !== undefined) {
            if (input.permission_keys.length === 0)
                return [];
            const permsRepo = await this.tds.getRepository(permission_entity_1.Permission);
            const perms = await permsRepo.find({ where: { code: (0, typeorm_1.In)(input.permission_keys) }, select: ["id", "code"] });
            const found = new Set(perms.map((p) => p.code));
            const missing = input.permission_keys.filter((k) => !found.has(k));
            if (missing.length)
                throw new common_1.BadRequestException(`Permisos inválidos: ${missing.join(", ")}`);
            return perms.map((p) => p.id);
        }
        return undefined;
    }
    async create(dto) {
        const { permission_ids, permission_keys, ...roleData } = dto;
        const rolesRepo = await this.tds.getRepository(role_entity_1.Role);
        const rolePermsRepo = await this.tds.getRepository(role_permission_entity_1.RolePermission);
        const existing = await rolesRepo.findOne({ where: { code: roleData.code } });
        if (existing)
            throw new common_1.ConflictException(`El código de rol '${roleData.code}' ya existe`);
        const role = rolesRepo.create(roleData);
        const savedRole = await rolesRepo.save(role);
        const ids = (await this.resolvePermissionIds({ permission_ids, permission_keys })) ?? [];
        if (ids.length > 0) {
            await rolePermsRepo.save(ids.map((permissionId) => rolePermsRepo.create({ roleId: savedRole.id, permissionId })));
        }
        return this.findOneWithPermissions(savedRole.id);
    }
    async update(id, dto) {
        const { permission_ids, permission_keys, ...roleData } = dto;
        const rolesRepo = await this.tds.getRepository(role_entity_1.Role);
        const rolePermsRepo = await this.tds.getRepository(role_permission_entity_1.RolePermission);
        const role = await this.findOne(id);
        if (roleData.code && roleData.code !== role.code) {
            const existing = await rolesRepo.findOne({ where: { code: roleData.code } });
            if (existing)
                throw new common_1.ConflictException(`El código de rol '${roleData.code}' ya existe`);
        }
        await rolesRepo.update({ id }, roleData);
        const finalPermissionIds = await this.resolvePermissionIds({ permission_ids, permission_keys });
        if (finalPermissionIds !== undefined) {
            await rolePermsRepo.delete({ roleId: id });
            if (finalPermissionIds.length > 0) {
                await rolePermsRepo.save(finalPermissionIds.map((permissionId) => rolePermsRepo.create({ roleId: id, permissionId })));
            }
        }
        return this.findOneWithPermissions(id);
    }
    async findOne(id) {
        const rolesRepo = await this.tds.getRepository(role_entity_1.Role);
        const role = await rolesRepo.findOne({ where: { id } });
        if (!role)
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        return role;
    }
    async findOneWithPermissions(id) {
        const rolesRepo = await this.tds.getRepository(role_entity_1.Role);
        const role = await rolesRepo.findOne({
            where: { id },
            relations: ["rolePermissions", "rolePermissions.permission", "userRoles"],
        });
        if (!role)
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        return {
            ...role,
            userCount: role.userRoles?.length || 0,
            permissions: role.rolePermissions?.map((rp) => rp.permission) || [],
            permission_keys: role.rolePermissions?.map((rp) => rp.permission?.code).filter(Boolean) || [],
        };
    }
    async remove(id) {
        const rolesRepo = await this.tds.getRepository(role_entity_1.Role);
        const role = await this.findOneWithPermissions(id);
        if (role.isSystem)
            throw new common_1.ConflictException("No se puede eliminar un rol del sistema");
        if (role.userCount > 0)
            throw new common_1.ConflictException(`No se puede eliminar el rol. Hay ${role.userCount} usuario(s) asignado(s)`);
        await rolesRepo.delete({ id });
        return { message: "Rol eliminado correctamente" };
    }
    async findAll(params = {}) {
        const { q, page = 1, pageSize = 20 } = params;
        const rolesRepo = await this.tds.getRepository(role_entity_1.Role);
        const qb = rolesRepo.createQueryBuilder("role");
        if (q)
            qb.where("role.code LIKE :q OR role.name LIKE :q", { q: `%${q}%` });
        const [data, total] = await qb
            .leftJoinAndSelect("role.rolePermissions", "rp")
            .leftJoinAndSelect("rp.permission", "permission")
            .leftJoinAndSelect("role.userRoles", "ur")
            .orderBy("role.name", "ASC")
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();
        return {
            data: data.map((role) => ({ ...role, userCount: role.userRoles?.length || 0, permissions: role.rolePermissions?.map((rp) => rp.permission) || [] })),
            meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], RolesService);
//# sourceMappingURL=roles.service.js.map