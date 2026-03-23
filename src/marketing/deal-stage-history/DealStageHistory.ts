import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { Deal } from "../../marketing/deals/Deal";
import { FunnelStage } from "../../marketing/funnel-stages/FunnelStage";
import { User } from "../../users/user.entity";

@Entity({ name: "mk_deal_stage_history" })
export class DealStageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  /* ======================
     FK COLUMNS
     ====================== */

  @Column({ name: "deal_id", type: "int" })
  @Index()
  deal_id: number;

  @Column({ name: "from_stage_id", type: "int" })
  @Index()
  from_stage_id: number;

  @Column({ name: "to_stage_id", type: "int" })
  @Index()
  to_stage_id: number;

  @Column({ name: "changed_by", type: "int", nullable: true })
  changed_by_id: number | null;

  /* ======================
     RELACIONES
     ====================== */

  @ManyToOne(() => Deal, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "deal_id" })
  deal: Deal;

  @ManyToOne(() => FunnelStage, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "from_stage_id" })
  from_stage: FunnelStage;

  @ManyToOne(() => FunnelStage, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "to_stage_id" })
  to_stage: FunnelStage;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "changed_by" })
  changed_by: User | null;

  /* ======================
     FECHAS
     ====================== */

  @CreateDateColumn({ name: "changed_at", type: "timestamp" })
  changed_at: Date;
}
