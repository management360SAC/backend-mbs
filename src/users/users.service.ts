import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

import { User } from "./user.entity";
import { Role } from "../roles/role.entity";
import { UserRole } from "./user-role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "./dto/users.dto";

export type ListUsersArgs = {
  q?: string;
  role?: string;
  status?: "active" | "inactive";
  page: number;
  pageSize: number;
  sort: string;
  order: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,

    @InjectRepository(UserRole)
    private readonly userRolesRepo: Repository<UserRole>,

    @InjectRepository(RolePermission)
    private readonly rolePermsRepo: Repository<RolePermission>,

    @InjectRepository(Permission)
    private readonly permsRepo: Repository<Permission>,
  ) {}

  // ✅ Para Auth: trae roles + permisos por roles
  async findByEmailWithRolesAndPerms(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { email } as any,
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

  // ✅ Para JWT/me
  async findByIdWithRolesAndPerms(id: number): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id } as any,
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

  // ✅ Para endpoints users/:id
  async getById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id } as any,
      relations: {
        userRoles: {
          role: true,
        },
      },
    });

    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  // Helper: setear roles en user_roles
  private async replaceUserRoles(userId: number, roleIds: number[]) {
    // validar roles
    const uniqueIds = Array.from(new Set(roleIds.map((x) => Number(x)).filter(Boolean)));

    if (uniqueIds.length === 0) {
      await this.userRolesRepo.delete({ userId } as any);
      return;
    }

    const roles = await this.rolesRepo.find({ where: { id: In(uniqueIds) } as any });
    if (roles.length !== uniqueIds.length) {
      throw new BadRequestException("Some role_ids do not exist");
    }

    // borrar actuales
    await this.userRolesRepo.delete({ userId } as any);

    // insertar nuevos
    const rows = uniqueIds.map((roleId) =>
      this.userRolesRepo.create({
        userId,
        roleId,
      }),
    );

    await this.userRolesRepo.save(rows);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const email = dto.email.trim().toLowerCase();

    const exists = await this.usersRepo.findOne({ where: { email } as any });
    if (exists) throw new ConflictException("Email already exists");

    const user = this.usersRepo.create({
      email,
      fullName: dto.full_name.trim(),
      isActive: dto.is_active ?? true,
      lastLoginAt: null,
    });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(dto.password, salt);

    // 1) guardar user
    const saved = await this.usersRepo.save(user);

    // 2) asignar roles (si vienen)
    if (dto.role_ids && dto.role_ids.length) {
      await this.replaceUserRoles(saved.id, dto.role_ids);
    }

    // 3) devolver user con roles
    return this.getById(saved.id);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } as any });
    if (!user) throw new NotFoundException("User not found");

    if (dto.email && dto.email.trim().toLowerCase() !== user.email) {
      const email = dto.email.trim().toLowerCase();
      const exists = await this.usersRepo.findOne({ where: { email } as any });
      if (exists) throw new ConflictException("Email already exists");
      user.email = email;
    }

    if (dto.full_name !== undefined) user.fullName = dto.full_name.trim();
    if (dto.is_active !== undefined) user.isActive = dto.is_active;

    const saved = await this.usersRepo.save(user);

    // roles: reemplazar tabla puente
    if (dto.role_ids) {
      await this.replaceUserRoles(saved.id, dto.role_ids);
    }

    return this.getById(saved.id);
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.usersRepo.findOne({ where: { id } as any });
    if (!user) throw new NotFoundException("User not found");

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(dto.new_password, salt);

    await this.usersRepo.save(user);
    return { ok: true };
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } as any });
    if (!user) throw new NotFoundException("User not found");

    // Por FK ON DELETE CASCADE debería borrarse user_roles,
    // pero si tu FK no está en cascada, esto lo asegura:
    await this.userRolesRepo.delete({ userId: id } as any);

    await this.usersRepo.delete(id);
    return { ok: true };
  }

  async list(args: ListUsersArgs) {
    const page = Math.max(1, Number(args.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(args.pageSize) || 10));
    const skip = (page - 1) * pageSize;

    const sortMap: Record<string, string> = {
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
      .orderBy(sort, order as "ASC" | "DESC")
      .skip(skip)
      .take(pageSize);

    if (args.status === "active") qb.andWhere("u.isActive = :a", { a: true });
    if (args.status === "inactive") qb.andWhere("u.isActive = :a", { a: false });

    if (args.q?.trim()) {
      const s = `%${args.q.trim()}%`;
      qb.andWhere("(u.fullName LIKE :s OR u.email LIKE :s)", { s });
    }

    if (args.role?.trim()) {
      const rVal = args.role.trim();
      const roleId = Number(rVal);

      if (Number.isFinite(roleId)) qb.andWhere("r.id = :rid", { rid: roleId });
      else qb.andWhere("LOWER(r.code) = LOWER(:rcode)", { rcode: rVal });
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
  // dentro de UsersService
async listOptions(args: { role?: string }) {
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

    if (Number.isFinite(roleId)) qb.andWhere("r.id = :rid", { rid: roleId });
    else qb.andWhere("LOWER(r.code) = LOWER(:rcode)", { rcode: rVal });
  }

  const rows = await qb.getMany();

  return rows.map((u) => ({
    id: u.id,
    full_name: u.fullName,
  }));
}

}
