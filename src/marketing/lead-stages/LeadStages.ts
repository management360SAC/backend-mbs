import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity({ name: "mk_lead_stages" })
export class LeadStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  @Index({ unique: true })
  name: string;

  @Column({ name: "order", type: "int", default: 0 })
  order: number;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "is_final", type: "boolean", default: false })
  isFinal: boolean;

  @Column({ name: "is_won", type: "boolean", default: false })
  isWon: boolean;

  @Column({ name: "is_lost", type: "boolean", default: false })
  isLost: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

}
