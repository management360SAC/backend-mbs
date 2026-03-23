import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Contact } from "../contacts/Contact";
import { Deal } from "../deals/Deal";
import { User } from "../../users/user.entity";

@Entity({ name: "mk_activities" })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  /* =====================
     Relaciones
  ====================== */

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: "contact_id" })
  contact?: Contact;

  @Column({ name: "contact_id", type: "int", nullable: true })
  contactId?: number;

  @ManyToOne(() => Deal, { nullable: true })
  @JoinColumn({ name: "deal_id" })
  deal?: Deal;

  @Column({ name: "deal_id", type: "int", nullable: true })
  dealId?: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "assigned_to" })
  assignedUser: User;

  @Column({ name: "assigned_to", type: "int" })
  assignedTo: number;

  /* =====================
     Datos de la actividad
  ====================== */

  @Column({ type: "varchar", length: 40 })
  type: string;

  @Column({ type: "varchar", length: 140 })
  subject: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "due_at", type: "datetime", nullable: true })
  dueAt?: Date;

  @Column({ name: "done_at", type: "datetime", nullable: true })
  doneAt?: Date;

  /* =====================
     Auditoría
  ====================== */

  @Column({ name: "created_by", type: "int", nullable: true })
  createdBy?: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
