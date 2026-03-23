import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  PrimaryColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Role } from "../roles/role.entity";

@Entity({ name: "user_roles" })
@Index(["userId", "roleId"], { unique: true })
export class UserRole {
  @PrimaryColumn({ name: "user_id", type: "bigint", unsigned: true })
  userId!: number;

  @PrimaryColumn({ name: "role_id", type: "bigint", unsigned: true })
  roleId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
