import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "nurturing"
  | "won"
  | "lost";

@Entity({ name: "mk_contacts" })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30, default: "lead" })
  type: string;

  @Column({ type: "varchar", length: 140 })
  full_name: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  email: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  phone: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  document_id: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  company: string | null;

  @Column({ type: "varchar", length: 80, nullable: true })
  country: string | null;

  @Column({ type: "varchar", length: 80, nullable: true })
  city: string | null;

  @Column({ type: "int", nullable: true })
  source_id: number | null;

  @Column({ type: "int", nullable: true })
  owner_user_id: number | null;

  @Column({ type: "varchar", length: 20, default: "new" })
  status: LeadStatus;

  @Column({ type: "int", nullable: true })
  score: number | null;

  @Column({ type: "varchar", length: 180, nullable: true })
  lost_reason: string | null;

  @Column({ type: "int", nullable: true })
  created_by: number | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
