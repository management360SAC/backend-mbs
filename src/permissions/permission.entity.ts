import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { RolePermission } from "../roles/role-permission.entity";

@Entity({ name: "permissions" })
export class Permission {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 120, unique: true })
  code!: string;

  @Column({ type: "varchar", length: 120 })
  module!: string;

  @Column({ type: "varchar", length: 120 })
  action!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions!: RolePermission[];
}
