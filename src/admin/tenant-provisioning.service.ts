import { Injectable, Logger, ConflictException, BadRequestException, NotFoundException } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { TENANT_ENTITIES } from "../tenant/tenant-entities";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { TenantInfo } from "../tenant/tenant.context";
import { User } from "../users/user.entity";
import { Role } from "../roles/role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { UserRole } from "../users/user-role.entity";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { CreateUserDto } from "../users/dto/users.dto";
import { UpdateEmpresaConfigDto } from "../empresa-config/dto/update-empresa-config.dto";

const DEFAULT_PERMISSIONS = [
  { code: "users.create",      module: "users",       action: "create",  description: "Crear usuarios" },
  { code: "users.read",        module: "users",       action: "read",    description: "Ver usuarios" },
  { code: "users.update",      module: "users",       action: "update",  description: "Editar usuarios" },
  { code: "users.delete",      module: "users",       action: "delete",  description: "Eliminar usuarios" },
  { code: "roles.create",      module: "roles",       action: "create",  description: "Crear roles" },
  { code: "roles.read",        module: "roles",       action: "read",    description: "Ver roles" },
  { code: "roles.update",      module: "roles",       action: "update",  description: "Editar roles" },
  { code: "roles.delete",      module: "roles",       action: "delete",  description: "Eliminar roles" },
  { code: "permissions.read",  module: "permissions", action: "read",    description: "Ver permisos" },
  { code: "permissions.assign",module: "permissions", action: "assign",  description: "Asignar permisos" },
  { code: "funnel.read",       module: "funnel",      action: "read",    description: "Ver embudo" },
  { code: "funnel.manage",     module: "funnel",      action: "manage",  description: "Gestionar embudo" },
  { code: "marketing.read",    module: "marketing",   action: "read",    description: "Ver marketing" },
  { code: "marketing.manage",  module: "marketing",   action: "manage",  description: "Gestionar marketing" },
];

const DEFAULT_LEAD_STAGES = [
  { name: "Nuevo",              order: 1, isActive: true,  isFinal: false },
  { name: "Contactado",         order: 2, isActive: true,  isFinal: false },
  { name: "Calificado",         order: 3, isActive: true,  isFinal: false },
  { name: "Propuesta enviada",  order: 4, isActive: true,  isFinal: false },
  { name: "Negociacion",        order: 5, isActive: true,  isFinal: false },
  { name: "Ganado",             order: 6, isActive: true,  isFinal: true  },
  { name: "Perdido",            order: 7, isActive: true,  isFinal: true  },
];

@Injectable()
export class TenantProvisioningService {
  private readonly logger = new Logger(TenantProvisioningService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tds: TenantDataSourceService,
  ) {}

  async listTenantsPublic() {
    return this.prisma.tenant.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { slug: true, name: true },
    });
  }

  async listTenants() {
    return this.prisma.tenant.findMany({
      orderBy: { id: "asc" },
      select: { id: true, name: true, slug: true, dbName: true, dbHost: true, dbPort: true, isActive: true, createdAt: true, updatedAt: true },
    });
  }

  async provision(dto: CreateTenantDto) {
    const slug = dto.slug.toLowerCase().trim();
    const dbName = `crm_tenant_${slug.replace(/-/g, "_")}`;

    // Check uniqueness in master
    const existing = await this.prisma.tenant.findFirst({ where: { OR: [{ slug }, { dbName }] } });
    if (existing) {
      throw new ConflictException(`Ya existe un tenant con slug '${slug}' o db '${dbName}'`);
    }

    const adminUrl = process.env.DATABASE_ADMIN_URL;
    if (!adminUrl) throw new BadRequestException("DATABASE_ADMIN_URL no configurada");

    // Parse admin URL for host/port/user/pass
    const { host, port, username, password } = this.parseUrl(adminUrl);

    // 1. Create the database using admin credentials
    const adminDs = new DataSource({
      type: "mysql",
      host, port, username, password,
      database: "mysql",
      synchronize: false,
    });
    await adminDs.initialize();

    try {
      await adminDs.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await adminDs.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO 'crm'@'%'`);
      await adminDs.query(`FLUSH PRIVILEGES`);
      this.logger.log(`Database created: ${dbName}`);
    } finally {
      await adminDs.destroy();
    }

    // 2. Apply schema via TypeORM synchronize
    const tenantInfo = { id: 0, slug, dbName, dbHost: host, dbPort: port, dbUser: "crm", dbPass: "crm" };
    const schemaDs = new DataSource({
      type: "mysql",
      host,
      port,
      username: "crm",
      password: "crm",
      database: dbName,
      entities: TENANT_ENTITIES,
      synchronize: true,
    });
    await schemaDs.initialize();
    this.logger.log(`Schema synchronized for: ${dbName}`);

    // 3. Seed default data
    await this.seedTenantData(schemaDs, dto);
    await schemaDs.destroy();

    // 4. Create tenant record in crm_master
    const tenant = await this.prisma.tenant.create({
      data: { name: dto.name, slug, dbName, dbHost: host, dbPort: port, dbUser: "crm", dbPass: "crm", isActive: true },
    });

    this.logger.log(`Tenant provisioned: ${slug} (id=${tenant.id})`);
    return tenant;
  }

  private async seedTenantData(ds: DataSource, dto: CreateTenantDto) {
    // Permissions
    const permRepo = ds.getRepository(Permission);
    const savedPerms: Permission[] = [];
    for (const p of DEFAULT_PERMISSIONS) {
      let perm = await permRepo.findOne({ where: { code: p.code } });
      if (!perm) perm = await permRepo.save(permRepo.create(p));
      savedPerms.push(perm);
    }

    // Admin role
    const roleRepo = ds.getRepository(Role);
    let adminRole = await roleRepo.findOne({ where: { code: "ADMIN" } });
    if (!adminRole) {
      adminRole = await roleRepo.save(roleRepo.create({ code: "ADMIN", name: "Administrador", description: "Acceso completo al sistema", isSystem: true }));
    }

    // Assign all permissions to admin role
    const rpRepo = ds.getRepository(RolePermission);
    for (const perm of savedPerms) {
      const exists = await rpRepo.findOne({ where: { roleId: adminRole.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: adminRole.id, permissionId: perm.id }));
    }

    // Vendedor role
    let vendedorRole = await roleRepo.findOne({ where: { code: "VENDEDOR" } });
    if (!vendedorRole) {
      vendedorRole = await roleRepo.save(roleRepo.create({ code: "VENDEDOR", name: "Vendedor", description: "Acceso a ventas y marketing", isSystem: false }));
    }
    const vendedorPerms = savedPerms.filter((p) => ["funnel.read", "funnel.manage", "marketing.read", "marketing.manage"].includes(p.code));
    for (const perm of vendedorPerms) {
      const exists = await rpRepo.findOne({ where: { roleId: vendedorRole.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: vendedorRole.id, permissionId: perm.id }));
    }

    // Admin user
    const userRepo = ds.getRepository(User);
    const adminEmail = dto.adminEmail ?? "admin@crm.local";
    let adminUser = await userRepo.findOne({ where: { email: adminEmail } as any });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(dto.adminPassword ?? "admin123", salt);
      adminUser = await userRepo.save(
        userRepo.create({ email: adminEmail, fullName: dto.adminFullName ?? "Admin", isActive: true, passwordHash: hash, lastLoginAt: null }),
      );
    }

    // Assign ADMIN role to admin user
    const urRepo = ds.getRepository(UserRole);
    const urExists = await urRepo.findOne({ where: { userId: adminUser.id, roleId: adminRole.id } as any });
    if (!urExists) await urRepo.save(urRepo.create({ userId: adminUser.id, roleId: adminRole.id }));

    // Lead stages
    const stageRepo = ds.getRepository(LeadStage);
    for (const s of DEFAULT_LEAD_STAGES) {
      const exists = await stageRepo.findOne({ where: { name: s.name } });
      if (!exists) await stageRepo.save(stageRepo.create(s));
    }

    this.logger.log(`Default data seeded for new tenant`);
  }

  private parseUrl(url: string): { host: string; port: number; username: string; password: string } {
    // mysql://user:pass@host:port/db
    const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)/);
    if (!match) throw new BadRequestException("Invalid DATABASE_ADMIN_URL format");
    return { username: match[1], password: match[2], host: match[3], port: Number(match[4]) };
  }

  private async resolveTenantInfo(slug: string): Promise<TenantInfo> {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug } });
    if (!tenant) throw new NotFoundException(`Empresa '${slug}' no encontrada`);
    return { id: tenant.id, slug: tenant.slug, dbName: tenant.dbName, dbHost: tenant.dbHost, dbPort: tenant.dbPort, dbUser: tenant.dbUser, dbPass: tenant.dbPass };
  }

  async listTenantUsers(slug: string) {
    const info = await this.resolveTenantInfo(slug);
    const repo = await this.tds.getRepository(User, info);
    const users = await repo.find({
      relations: { userRoles: { role: true } },
      order: { createdAt: "DESC" },
    });
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      full_name: u.fullName,
      is_active: u.isActive,
      last_login_at: u.lastLoginAt,
      created_at: u.createdAt,
      roles: (u.userRoles ?? []).map((ur) => ur.role).filter(Boolean).map((r) => ({ id: r.id, code: r.code, name: r.name })),
    }));
  }

  async createTenantUser(slug: string, dto: CreateUserDto) {
    const info = await this.resolveTenantInfo(slug);
    const repo = await this.tds.getRepository(User, info);
    const email = dto.email.trim().toLowerCase();
    const exists = await repo.findOne({ where: { email } as any });
    if (exists) throw new ConflictException("Email already exists");

    const user = repo.create({ email, fullName: dto.full_name.trim(), isActive: dto.is_active ?? true, lastLoginAt: null });
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(dto.password, salt);
    const saved = await repo.save(user);

    if (dto.role_ids?.length) {
      const urRepo = await this.tds.getRepository(UserRole, info);
      const roleRepo = await this.tds.getRepository(Role, info);
      const uniqueIds = Array.from(new Set(dto.role_ids.map(Number).filter(Boolean)));
      const roles = await roleRepo.find({ where: { id: In(uniqueIds) } as any });
      for (const role of roles) {
        await urRepo.save(urRepo.create({ userId: saved.id, roleId: role.id }));
      }
    }

    const full = await repo.findOne({ where: { id: saved.id } as any, relations: { userRoles: { role: true } } });
    const u = full!;
    return {
      id: u.id, email: u.email, full_name: u.fullName, is_active: u.isActive, last_login_at: u.lastLoginAt, created_at: u.createdAt,
      roles: (u.userRoles ?? []).map((ur) => ur.role).filter(Boolean).map((r) => ({ id: r.id, code: r.code, name: r.name })),
    };
  }

  async getTenantConfig(slug: string) {
    const info = await this.resolveTenantInfo(slug);
    const repo = await this.tds.getRepository(EmpresaConfig, info);
    let config = await repo.findOne({ where: { id: 1 } });
    if (!config) {
      config = repo.create({ id: 1, nombre: slug });
      await repo.save(config);
    }
    return config;
  }

  async updateTenantConfig(slug: string, dto: UpdateEmpresaConfigDto) {
    const info = await this.resolveTenantInfo(slug);
    const repo = await this.tds.getRepository(EmpresaConfig, info);
    let config = await repo.findOne({ where: { id: 1 } });
    if (!config) {
      config = repo.create({ id: 1, nombre: slug });
    }
    Object.assign(config, dto);
    return repo.save(config);
  }
}
