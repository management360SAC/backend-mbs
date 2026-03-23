import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Role } from "./role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermsRepo: Repository<RolePermission>,

    @InjectRepository(Permission)
    private readonly permsRepo: Repository<Permission>,
  ) {}

  private async resolvePermissionIds(input: {
    permission_ids?: number[];
    permission_keys?: string[];
  }): Promise<number[] | undefined> {
    // prioridad: si vienen ids, usar ids
    if (input.permission_ids !== undefined) return input.permission_ids;

    // si vienen keys, convertir a ids
    if (input.permission_keys !== undefined) {
      if (input.permission_keys.length === 0) return [];

      const perms = await this.permsRepo.find({
        where: { code: In(input.permission_keys) },
        select: ["id", "code"],
      });

      const found = new Set(perms.map((p) => p.code));
      const missing = input.permission_keys.filter((k) => !found.has(k));

      if (missing.length) {
        throw new BadRequestException(
          `Permisos inválidos: ${missing.join(", ")}`
        );
      }

      return perms.map((p) => p.id);
    }

    // si no viene nada, undefined (no tocar permisos en update)
    return undefined;
  }

  async create(dto: CreateRoleDto) {
    const { permission_ids, permission_keys, ...roleData } = dto;

    const existing = await this.rolesRepo.findOne({ where: { code: roleData.code } });
    if (existing) throw new ConflictException(`El código de rol '${roleData.code}' ya existe`);

    const role = this.rolesRepo.create(roleData);
    const savedRole = await this.rolesRepo.save(role);

    const finalPermissionIds = await this.resolvePermissionIds({ permission_ids, permission_keys });
    const ids = finalPermissionIds ?? []; // en create, si no mandan nada => []

    if (ids.length > 0) {
      await this.rolePermsRepo.save(
        ids.map((permissionId) =>
          this.rolePermsRepo.create({ roleId: savedRole.id, permissionId }),
        ),
      );
    }

    return this.findOneWithPermissions(savedRole.id);
  }

  async update(id: number, dto: UpdateRoleDto) {
    const { permission_ids, permission_keys, ...roleData } = dto;

    const role = await this.findOne(id);

    if (roleData.code && roleData.code !== role.code) {
      const existing = await this.rolesRepo.findOne({ where: { code: roleData.code } });
      if (existing) throw new ConflictException(`El código de rol '${roleData.code}' ya existe`);
    }

    await this.rolesRepo.update({ id }, roleData);

    const finalPermissionIds = await this.resolvePermissionIds({ permission_ids, permission_keys });

    // solo actualiza permisos si el request manda permission_ids o permission_keys
    if (finalPermissionIds !== undefined) {
      await this.rolePermsRepo.delete({ roleId: id });

      if (finalPermissionIds.length > 0) {
        await this.rolePermsRepo.save(
          finalPermissionIds.map((permissionId) =>
            this.rolePermsRepo.create({ roleId: id, permissionId }),
          ),
        );
      }
    }

    return this.findOneWithPermissions(id);
  }

  // ...tu findAll/findOne/findOneWithPermissions/remove quedan igual...
  async findOne(id: number) {
    const role = await this.rolesRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return role;
  }

  async findOneWithPermissions(id: number) {
    const role = await this.rolesRepo.findOne({
      where: { id },
      relations: ["rolePermissions", "rolePermissions.permission", "userRoles"],
    });

    if (!role) throw new NotFoundException(`Rol con ID ${id} no encontrado`);

    return {
      ...role,
      userCount: role.userRoles?.length || 0,
      permissions: role.rolePermissions?.map((rp) => rp.permission) || [],
      // opcional: devolver keys para tu frontend
      permission_keys: role.rolePermissions?.map((rp) => rp.permission?.code).filter(Boolean) || [],
    };
  }

  async remove(id: number) {
    const role = await this.findOneWithPermissions(id);

    if (role.isSystem) throw new ConflictException("No se puede eliminar un rol del sistema");
    if (role.userCount > 0) throw new ConflictException(`No se puede eliminar el rol. Hay ${role.userCount} usuario(s) asignado(s)`);

    await this.rolesRepo.delete({ id });
    return { message: "Rol eliminado correctamente" };
  }
  async findAll(params: { q?: string; page?: number; pageSize?: number } = {}) {
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

}
