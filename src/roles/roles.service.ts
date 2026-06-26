import { Injectable, NotFoundException, ConflictException, BadRequestException } from "@nestjs/common";
import { In } from "typeorm";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { Role } from "./role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  private async resolvePermissionIds(input: { permission_ids?: number[]; permission_keys?: string[] }): Promise<number[] | undefined> {
    if (input.permission_ids !== undefined) return input.permission_ids;
    if (input.permission_keys !== undefined) {
      if (input.permission_keys.length === 0) return [];
      const permsRepo = await this.tds.getRepository(Permission);
      const perms = await permsRepo.find({ where: { code: In(input.permission_keys) }, select: ["id", "code"] });
      const found = new Set(perms.map((p) => p.code));
      const missing = input.permission_keys.filter((k) => !found.has(k));
      if (missing.length) throw new BadRequestException(`Permisos inválidos: ${missing.join(", ")}`);
      return perms.map((p) => p.id);
    }
    return undefined;
  }

  async create(dto: CreateRoleDto) {
    const { permission_ids, permission_keys, ...roleData } = dto;
    const rolesRepo = await this.tds.getRepository(Role);
    const rolePermsRepo = await this.tds.getRepository(RolePermission);

    const existing = await rolesRepo.findOne({ where: { code: roleData.code } });
    if (existing) throw new ConflictException(`El código de rol '${roleData.code}' ya existe`);

    const role = rolesRepo.create(roleData);
    const savedRole = await rolesRepo.save(role);
    const ids = (await this.resolvePermissionIds({ permission_ids, permission_keys })) ?? [];

    if (ids.length > 0) {
      await rolePermsRepo.save(ids.map((permissionId) => rolePermsRepo.create({ roleId: savedRole.id, permissionId })));
    }
    return this.findOneWithPermissions(savedRole.id);
  }

  async update(id: number, dto: UpdateRoleDto) {
    const { permission_ids, permission_keys, ...roleData } = dto;
    const rolesRepo = await this.tds.getRepository(Role);
    const rolePermsRepo = await this.tds.getRepository(RolePermission);
    const role = await this.findOne(id);

    if (roleData.code && roleData.code !== role.code) {
      const existing = await rolesRepo.findOne({ where: { code: roleData.code } });
      if (existing) throw new ConflictException(`El código de rol '${roleData.code}' ya existe`);
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

  async findOne(id: number) {
    const rolesRepo = await this.tds.getRepository(Role);
    const role = await rolesRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return role;
  }

  async findOneWithPermissions(id: number) {
    const rolesRepo = await this.tds.getRepository(Role);
    const role = await rolesRepo.findOne({
      where: { id },
      relations: ["rolePermissions", "rolePermissions.permission", "userRoles"],
    });
    if (!role) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return {
      ...role,
      userCount: role.userRoles?.length || 0,
      permissions: role.rolePermissions?.map((rp) => rp.permission) || [],
      permission_keys: role.rolePermissions?.map((rp) => rp.permission?.code).filter(Boolean) || [],
    };
  }

  async remove(id: number) {
    const rolesRepo = await this.tds.getRepository(Role);
    const role = await this.findOneWithPermissions(id);
    if (role.isSystem) throw new ConflictException("No se puede eliminar un rol del sistema");
    if (role.userCount > 0) throw new ConflictException(`No se puede eliminar el rol. Hay ${role.userCount} usuario(s) asignado(s)`);
    await rolesRepo.delete({ id });
    return { message: "Rol eliminado correctamente" };
  }

  async findAll(params: { q?: string; page?: number; pageSize?: number } = {}) {
    const { q, page = 1, pageSize = 20 } = params;
    const rolesRepo = await this.tds.getRepository(Role);
    const qb = rolesRepo.createQueryBuilder("role");
    if (q) qb.where("role.code LIKE :q OR role.name LIKE :q", { q: `%${q}%` });
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
}
