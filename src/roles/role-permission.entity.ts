import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  PrimaryColumn,
} from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "../permissions/permission.entity";

@Entity({ name: "role_permissions" })
@Index(["roleId", "permissionId"], { unique: true })
export class RolePermission {
  @PrimaryColumn({ name: "role_id", type: "bigint", unsigned: true })
  roleId!: number;

  @PrimaryColumn({ name: "permission_id", type: "bigint", unsigned: true })
  permissionId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permission_id" })
  permission!: Permission;
}
