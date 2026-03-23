import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mk_lead_sources" })
export class LeadSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  channel: string | null;

  @CreateDateColumn()
  created_at: Date;
}
