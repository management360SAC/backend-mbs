import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { In } from "typeorm";
import * as bcrypt from "bcryptjs";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
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
  constructor(private readonly tds: TenantDataSourceService) {}

  async findByEmailWithRolesAndPerms(email: string): Promise<User | null> {
    const repo = await this.tds.getRepository(User);
    return repo.findOne({
      where: { email } as any,
      relations: { userRoles: { role: { rolePermissions: { permission: true } } } },
    });
  }

  async findByIdWithRolesAndPerms(id: number): Promise<User | null> {
    const repo = await this.tds.getRepository(User);
    return repo.findOne({
      where: { id } as any,
      relations: { userRoles: { role: { rolePermissions: { permission: true } } } },
    });
  }

  async getById(id: number): Promise<User> {
    const repo = await this.tds.getRepository(User);
    const user = await repo.findOne({
      where: { id } as any,
      relations: { userRoles: { role: true } },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  private async replaceUserRoles(userId: number, roleIds: number[]) {
    const userRolesRepo = await this.tds.getRepository(UserRole);
    const rolesRepo = await this.tds.getRepository(Role);
    const uniqueIds = Array.from(new Set(roleIds.map((x) => Number(x)).filter(Boolean)));

    await userRolesRepo.delete({ userId } as any);
    if (uniqueIds.length === 0) return;

    const roles = await rolesRepo.find({ where: { id: In(uniqueIds) } as any });
    if (roles.length !== uniqueIds.length) throw new BadRequestException("Some role_ids do not exist");

    const rows = uniqueIds.map((roleId) => userRolesRepo.create({ userId, roleId }));
    await userRolesRepo.save(rows);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const repo = await this.tds.getRepository(User);
    const email = dto.email.trim().toLowerCase();
    const exists = await repo.findOne({ where: { email } as any });
    if (exists) throw new ConflictException("Email already exists");

    const user = repo.create({ email, fullName: dto.full_name.trim(), isActive: dto.is_active ?? true, lastLoginAt: null });
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(dto.password, salt);

    const saved = await repo.save(user);
    if (dto.role_ids?.length) await this.replaceUserRoles(saved.id, dto.role_ids);
    return this.getById(saved.id);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const repo = await this.tds.getRepository(User);
    const user = await repo.findOne({ where: { id } as any });
    if (!user) throw new NotFoundException("User not found");

    if (dto.email && dto.email.trim().toLowerCase() !== user.email) {
      const email = dto.email.trim().toLowerCase();
      const exists = await repo.findOne({ where: { email } as any });
      if (exists) throw new ConflictException("Email already exists");
      user.email = email;
    }
    if (dto.full_name !== undefined) user.fullName = dto.full_name.trim();
    if (dto.is_active !== undefined) user.isActive = dto.is_active;

    await repo.save(user);
    if (dto.role_ids) await this.replaceUserRoles(id, dto.role_ids);
    return this.getById(id);
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const repo = await this.tds.getRepository(User);
    const user = await repo.findOne({ where: { id } as any });
    if (!user) throw new NotFoundException("User not found");
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(dto.new_password, salt);
    await repo.save(user);
    return { ok: true };
  }

  async remove(id: number) {
    const repo = await this.tds.getRepository(User);
    const userRolesRepo = await this.tds.getRepository(UserRole);
    const user = await repo.findOne({ where: { id } as any });
    if (!user) throw new NotFoundException("User not found");
    await userRolesRepo.delete({ userId: id } as any);
    await repo.delete(id);
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

    const repo = await this.tds.getRepository(User);
    const qb = repo
      .createQueryBuilder("u")
      .leftJoin("u.userRoles", "ur")
      .leftJoin("ur.role", "r")
      .select(["u.id", "u.email", "u.fullName", "u.isActive", "u.lastLoginAt", "u.createdAt", "u.updatedAt", "ur.userId", "ur.roleId", "ur.createdAt", "r.id", "r.code", "r.name", "r.description"])
      .orderBy(sort, order as "ASC" | "DESC")
      .skip(skip)
      .take(pageSize);

    if (args.status === "active") qb.andWhere("u.isActive = :a", { a: true });
    if (args.status === "inactive") qb.andWhere("u.isActive = :a", { a: false });
    if (args.q?.trim()) qb.andWhere("(u.fullName LIKE :s OR u.email LIKE :s)", { s: `%${args.q.trim()}%` });

    if (args.role?.trim()) {
      const rVal = args.role.trim();
      const roleId = Number(rVal);
      if (Number.isFinite(roleId)) qb.andWhere("r.id = :rid", { rid: roleId });
      else qb.andWhere("LOWER(r.code) = LOWER(:rcode)", { rcode: rVal });
    }

    const [rows, total] = await qb.getManyAndCount();
    return {
      data: rows.map((u) => ({
        id: u.id, email: u.email, full_name: u.fullName, is_active: u.isActive,
        last_login_at: u.lastLoginAt, created_at: u.createdAt, updated_at: u.updatedAt,
        roles: (u.userRoles ?? []).map((ur) => ur.role).filter(Boolean).map((r) => ({ id: r.id, code: r.code, name: r.name, description: r.description })),
      })),
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  async listOptions(args: { role?: string }) {
    const repo = await this.tds.getRepository(User);
    const qb = repo.createQueryBuilder("u").leftJoin("u.userRoles", "ur").leftJoin("ur.role", "r").select(["u.id", "u.fullName"]).where("u.isActive = :a", { a: true }).orderBy("u.fullName", "ASC");
    if (args.role?.trim()) {
      const rVal = args.role.trim();
      const roleId = Number(rVal);
      if (Number.isFinite(roleId)) qb.andWhere("r.id = :rid", { rid: roleId });
      else qb.andWhere("LOWER(r.code) = LOWER(:rcode)", { rcode: rVal });
    }
    const rows = await qb.getMany();
    return rows.map((u) => ({ id: u.id, full_name: u.fullName }));
  }
}
