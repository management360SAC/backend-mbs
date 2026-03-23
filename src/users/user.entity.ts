import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 180, unique: true })
  email!: string;

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ name: "full_name", type: "varchar", length: 255 })
  fullName!: string;

  @Column({ name: "is_active", type: "tinyint", width: 1 })
  isActive!: boolean;

  @Column({ name: "last_login_at", type: "datetime", nullable: true })
  lastLoginAt!: Date | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // ✅ user_roles (user_id, role_id, created_at)
  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles!: UserRole[];
}
