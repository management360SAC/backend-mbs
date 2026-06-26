import { Injectable, Logger, ConflictException, BadRequestException } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { TENANT_ENTITIES } from "../tenant/tenant-entities";
import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { User } from "../users/user.entity";
import { Role } from "../roles/role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { UserRole } from "../users/user-role.entity";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { CreateTenantDto } from "./dto/create-tenant.dto";

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

    const host = process.env.DB_HOST;
    if (!host) throw new BadRequestException("DB_HOST no configurado");
    const port = parseInt(process.env.DB_PORT ?? "3306");
    const username = process.env.DB_USER ?? "crm";
    const password = process.env.DB_PASS ?? "crm";

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

}
