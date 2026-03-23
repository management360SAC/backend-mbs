import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

import { LeadSource } from "../../marketing/lead-sources/LeadSource";
import { Seller } from "../../marketing/sellers/Seller";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";

@Entity({ name: "mk_leads" })
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  // -------------------------
  // Basic info
  // -------------------------
  @Column({ name: "full_name", type: "varchar", length: 140 })
  @Index()
  fullName: string;

  @Column({ type: "varchar", length: 180, nullable: true })
  @Index()
  email?: string | null;

  @Column({ type: "varchar", length: 40, nullable: true })
  @Index()
  phone?: string | null;

  @Column({ type: "text", nullable: true })
  notes?: string | null;

  @Column({ name: "expected_value", type: "numeric", precision: 12, scale: 2, nullable: true })
  expectedValue?: number | null;

  // -------------------------
  // FKs (kept as columns too)
  // -------------------------
  @Column({ name: "source_id", type: "int", nullable: true })
  sourceId?: number | null;

  @Column({ name: "seller_id", type: "int", nullable: true })
  sellerId?: number | null;

  @Column({ name: "current_stage_id", type: "int" })
  currentStageId: number;

  // -------------------------
  // Relations
  // -------------------------
  @ManyToOne(() => LeadSource, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "source_id" })
  source?: LeadSource | null;

  @ManyToOne(() => Seller, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "seller_id" })
  seller?: Seller | null;

  @ManyToOne(() => LeadStage, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "current_stage_id" })
  currentStage: LeadStage;

  // -------------------------
  // Audit
  // -------------------------
  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

}
