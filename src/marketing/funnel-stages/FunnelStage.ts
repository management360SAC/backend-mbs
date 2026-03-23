import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mk_funnel_stages" })
export class FunnelStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  name: string;

  @Column({ type: "int" })
  position: number;

  @Column({ type: "bool", default: false })
  is_won: boolean;

  @Column({ type: "bool", default: false })
  is_lost: boolean;

  @CreateDateColumn()
  created_at: Date;
}
