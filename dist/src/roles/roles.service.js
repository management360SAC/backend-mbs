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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
let RolesService = class RolesService {
    rolesRepo;
    rolePermsRepo;
    permsRepo;
    constructor(rolesRepo, rolePermsRepo, permsRepo) {
        this.rolesRepo = rolesRepo;
        this.rolePermsRepo = rolePermsRepo;
        this.permsRepo = permsRepo;
    }
    async resolvePermissionIds(input) {
        if (input.permission_ids !== undefined)
            return input.permission_ids;
        if (input.permission_keys !== undefined) {
            if (input.permission_keys.length === 0)
                return [];
            const perms = await this.permsRepo.find({
                where: { code: (0, typeorm_2.In)(input.permission_keys) },
                select: ["id", "code"],
            });
            const found = new Set(perms.map((p) => p.code));
            const missing = input.permission_keys.filter((k) => !found.has(k));
            if (missing.length) {
                throw new common_1.BadRequestException(`Permisos inválidos: ${missing.join(", ")}`);
            }
            return perms.map((p) => p.id);
        }
        return undefined;
    }
    async create(dto) {
        const { permission_ids, permission_keys, ...roleData } = dto;
        const existing = await this.rolesRepo.findOne({ where: { code: roleData.code } });
        if (existing)
            throw new common_1.ConflictException(`El código de rol '${roleData.code}' ya existe`);
        const role = this.rolesRepo.create(roleData);
        const savedRole = await this.rolesRepo.save(role);
        const finalPermissionIds = await this.resolvePermissionIds({ permission_ids, permission_keys });
        const ids = finalPermissionIds ?? [];
        if (ids.length > 0) {
            await this.rolePermsRepo.save(ids.map((permissionId) => this.rolePermsRepo.create({ roleId: savedRole.id, permissionId })));
        }
        return this.findOneWithPermissions(savedRole.id);
    }
    async update(id, dto) {
        const { permission_ids, permission_keys, ...roleData } = dto;
        const role = await this.findOne(id);
        if (roleData.code && roleData.code !== role.code) {
            const existing = await this.rolesRepo.findOne({ where: { code: roleData.code } });
            if (existing)
                throw new common_1.ConflictException(`El código de rol '${roleData.code}' ya existe`);
        }
        await this.rolesRepo.update({ id }, roleData);
        const finalPermissionIds = await this.resolvePermissionIds({ permission_ids, permission_keys });
        if (finalPermissionIds !== undefined) {
            await this.rolePermsRepo.delete({ roleId: id });
            if (finalPermissionIds.length > 0) {
                await this.rolePermsRepo.save(finalPermissionIds.map((permissionId) => this.rolePermsRepo.create({ roleId: id, permissionId })));
            }
        }
        return this.findOneWithPermissions(id);
    }
    async findOne(id) {
        const role = await this.rolesRepo.findOne({ where: { id } });
        if (!role)
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        return role;
    }
    async findOneWithPermissions(id) {
        const role = await this.rolesRepo.findOne({
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
        const role = await this.findOneWithPermissions(id);
        if (role.isSystem)
            throw new common_1.ConflictException("No se puede eliminar un rol del sistema");
        if (role.userCount > 0)
            throw new common_1.ConflictException(`No se puede eliminar el rol. Hay ${role.userCount} usuario(s) asignado(s)`);
        await this.rolesRepo.delete({ id });
        return { message: "Rol eliminado correctamente" };
    }
    async findAll(params = {}) {
        const { q, page = 1, pageSize = 20 } = params;
        const skip = (page - 1) * pageSize;
        const qb = this.rolesRepo.createQueryBuilder("role");
        if (q) {
            qb.where("role.code LIKE :q OR role.name LIKE :q", { q: `%${q}%` });
        }
        const [data, total] = await qb
            .leftJoinAndSelect("role.rolePermissions", "rp")
            .leftJoinAndSelect("rp.permission", "permission")
            .leftJoinAndSelect("role.userRoles", "ur")
            .orderBy("role.name", "ASC")
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();
        const roles = data.map((role) => ({
            ...role,
            userCount: role.userRoles?.length || 0,
            permissions: role.rolePermissions?.map((rp) => rp.permission) || [],
        }));
        return {
            data: roles,
            meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map