"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./user.entity");
const role_entity_1 = require("../roles/role.entity");
const user_role_entity_1 = require("./user-role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
let UsersService = class UsersService {
    usersRepo;
    rolesRepo;
    userRolesRepo;
    rolePermsRepo;
    permsRepo;
    constructor(usersRepo, rolesRepo, userRolesRepo, rolePermsRepo, permsRepo) {
        this.usersRepo = usersRepo;
        this.rolesRepo = rolesRepo;
        this.userRolesRepo = userRolesRepo;
        this.rolePermsRepo = rolePermsRepo;
        this.permsRepo = permsRepo;
    }
    async findByEmailWithRolesAndPerms(email) {
        return this.usersRepo.findOne({
            where: { email },
            relations: {
                userRoles: {
                    role: {
                        rolePermissions: {
                            permission: true,
                        },
                    },
                },
            },
        });
    }
    async findByIdWithRolesAndPerms(id) {
        return this.usersRepo.findOne({
            where: { id },
            relations: {
                userRoles: {
                    role: {
                        rolePermissions: {
                            permission: true,
                        },
                    },
                },
            },
        });
    }
    async getById(id) {
        const user = await this.usersRepo.findOne({
            where: { id },
            relations: {
                userRoles: {
                    role: true,
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return user;
    }
    async replaceUserRoles(userId, roleIds) {
        const uniqueIds = Array.from(new Set(roleIds.map((x) => Number(x)).filter(Boolean)));
        if (uniqueIds.length === 0) {
            await this.userRolesRepo.delete({ userId });
            return;
        }
        const roles = await this.rolesRepo.find({ where: { id: (0, typeorm_2.In)(uniqueIds) } });
        if (roles.length !== uniqueIds.length) {
            throw new common_1.BadRequestException("Some role_ids do not exist");
        }
        await this.userRolesRepo.delete({ userId });
        const rows = uniqueIds.map((roleId) => this.userRolesRepo.create({
            userId,
            roleId,
        }));
        await this.userRolesRepo.save(rows);
    }
    async create(dto) {
        const email = dto.email.trim().toLowerCase();
        const exists = await this.usersRepo.findOne({ where: { email } });
        if (exists)
            throw new common_1.ConflictException("Email already exists");
        const user = this.usersRepo.create({
            email,
            fullName: dto.full_name.trim(),
            isActive: dto.is_active ?? true,
            lastLoginAt: null,
        });
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(dto.password, salt);
        const saved = await this.usersRepo.save(user);
        if (dto.role_ids && dto.role_ids.length) {
            await this.replaceUserRoles(saved.id, dto.role_ids);
        }
        return this.getById(saved.id);
    }
    async update(id, dto) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        if (dto.email && dto.email.trim().toLowerCase() !== user.email) {
            const email = dto.email.trim().toLowerCase();
            const exists = await this.usersRepo.findOne({ where: { email } });
            if (exists)
                throw new common_1.ConflictException("Email already exists");
            user.email = email;
        }
        if (dto.full_name !== undefined)
            user.fullName = dto.full_name.trim();
        if (dto.is_active !== undefined)
            user.isActive = dto.is_active;
        const saved = await this.usersRepo.save(user);
        if (dto.role_ids) {
            await this.replaceUserRoles(saved.id, dto.role_ids);
        }
        return this.getById(saved.id);
    }
    async updatePassword(id, dto) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(dto.new_password, salt);
        await this.usersRepo.save(user);
        return { ok: true };
    }
    async remove(id) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.userRolesRepo.delete({ userId: id });
        await this.usersRepo.delete(id);
        return { ok: true };
    }
    async list(args) {
        const page = Math.max(1, Number(args.page) || 1);
        const pageSize = Math.min(100, Math.max(1, Number(args.pageSize) || 10));
        const skip = (page - 1) * pageSize;
        const sortMap = {
            created_at: "u.createdAt",
            last_login_at: "u.lastLoginAt",
            full_name: "u.fullName",
            email: "u.email",
        };
        const sort = sortMap[args.sort] ?? "u.createdAt";
        const order = (args.order || "desc").toLowerCase() === "asc" ? "ASC" : "DESC";
        const qb = this.usersRepo
            .createQueryBuilder("u")
            .leftJoin("u.userRoles", "ur")
            .leftJoin("ur.role", "r")
            .select([
            "u.id",
            "u.email",
            "u.fullName",
            "u.isActive",
            "u.lastLoginAt",
            "u.createdAt",
            "u.updatedAt",
            "ur.userId",
            "ur.roleId",
            "ur.createdAt",
            "r.id",
            "r.code",
            "r.name",
            "r.description",
        ])
            .orderBy(sort, order)
            .skip(skip)
            .take(pageSize);
        if (args.status === "active")
            qb.andWhere("u.isActive = :a", { a: true });
        if (args.status === "inactive")
            qb.andWhere("u.isActive = :a", { a: false });
        if (args.q?.trim()) {
            const s = `%${args.q.trim()}%`;
            qb.andWhere("(u.fullName LIKE :s OR u.email LIKE :s)", { s });
        }
        if (args.role?.trim()) {
            const rVal = args.role.trim();
            const roleId = Number(rVal);
            if (Number.isFinite(roleId))
                qb.andWhere("r.id = :rid", { rid: roleId });
            else
                qb.andWhere("LOWER(r.code) = LOWER(:rcode)", { rcode: rVal });
        }
        const [rows, total] = await qb.getManyAndCount();
        return {
            data: rows.map((u) => ({
                id: u.id,
                email: u.email,
                full_name: u.fullName,
                is_active: u.isActive,
                last_login_at: u.lastLoginAt,
                created_at: u.createdAt,
                updated_at: u.updatedAt,
                roles: (u.userRoles ?? [])
                    .map((ur) => ur.role)
                    .filter(Boolean)
                    .map((r) => ({
                    id: r.id,
                    code: r.code,
                    name: r.name,
                    description: r.description,
                })),
            })),
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async listOptions(args) {
        const qb = this.usersRepo
            .createQueryBuilder("u")
            .leftJoin("u.userRoles", "ur")
            .leftJoin("ur.role", "r")
            .select(["u.id", "u.fullName"])
            .where("u.isActive = :a", { a: true })
            .orderBy("u.fullName", "ASC");
        if (args.role?.trim()) {
            const rVal = args.role.trim();
            const roleId = Number(rVal);
            if (Number.isFinite(roleId))
                qb.andWhere("r.id = :rid", { rid: roleId });
            else
                qb.andWhere("LOWER(r.code) = LOWER(:rcode)", { rcode: rVal });
        }
        const rows = await qb.getMany();
        return rows.map((u) => ({
            id: u.id,
            full_name: u.fullName,
        }));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(3, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(4, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map