import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from "typeorm";

@Entity({ name: "audit_logs" })
@Index(["tenantSlug", "createdAt"])
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "tenant_slug", type: "varchar", length: 100 })
  @Index()
  tenantSlug: string;

  @Column({ name: "user_id", type: "int", nullable: true })
  userId: number | null;

  @Column({ name: "user_email", type: "varchar", length: 200, nullable: true })
  userEmail: string | null;

  @Column({ type: "varchar", length: 45, nullable: true })
  ip: string | null;

  @Column({ name: "user_agent", type: "text", nullable: true })
  userAgent: string | null;

  @Column({ type: "varchar", length: 50 })
  action: string;

  @Column({ type: "varchar", length: 100 })
  module: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  entity: string | null;

  @Column({ name: "entity_id", type: "int", nullable: true })
  entityId: number | null;

  @Column({ type: "varchar", length: 20, default: "success" })
  result: string;

  @Column({ type: "json", nullable: true })
  metadata: Record<string, any> | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
