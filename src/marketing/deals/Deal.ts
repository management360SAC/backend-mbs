import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { Contact } from "../contacts/Contact";
import { Campaign } from "../campaigns/Campaign";
import { FunnelStage } from "../funnel-stages/FunnelStage";
import { User } from "../../users/user.entity";

export type DealStatus = "open" | "won" | "lost";

@Entity({ name: "mk_deals" })
export class Deal {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  /* ======================
     FK COLUMNS
     ====================== */

  @Column({ name: "contact_id", type: "bigint" })
  @Index()
  contactId: string;

  @Column({ name: "campaign_id", type: "bigint", nullable: true })
  @Index()
  campaignId: string | null;

  @Column({ name: "stage_id", type: "bigint" })
  @Index()
  stageId: string;

  @Column({ name: "owner_user_id", type: "bigint", nullable: true })
  @Index()
  ownerUserId: string | null;

  @Column({ name: "created_by", type: "bigint" })
  @Index()
  createdBy: string;

  /* ======================
     DEAL DATA
     ====================== */

  @Column({ type: "varchar", length: 255 })
  title: string;

  // En Postgres es mejor numeric para dinero.
  // TypeORM suele devolver numeric como string -> está bien.
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  amount: string;

  @Column({ type: "varchar", length: 10, default: "PEN" })
  currency: string;

  @Column({ type: "int", nullable: true, comment: "Probabilidad de cierre (0-100)" })
  probability: number | null;

  @Column({ name: "expected_close_date", type: "date", nullable: true })
  expectedCloseDate: Date | null;

  @Column({ type: "varchar", length: 30, default: "open" })
  status: DealStatus;

  @Column({ name: "lost_reason", type: "text", nullable: true })
  lostReason: string | null;

  /* ======================
     DATES
     ====================== */

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  /* ======================
     RELACIONES
     ====================== */

  @ManyToOne(() => Contact, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;

  @ManyToOne(() => Campaign, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "campaign_id" })
  campaign: Campaign | null;

  @ManyToOne(() => FunnelStage, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "stage_id" })
  stage: FunnelStage;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "owner_user_id" })
  owner: User | null;

  @ManyToOne(() => User, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "created_by" })
  creator: User;
}
