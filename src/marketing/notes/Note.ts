import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { Contact } from "../contacts/Contact";
import { Deal } from "../deals/Deal";
import { User } from "../../users/user.entity";

@Entity({ name: "mk_notes" })
export class Note {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  /* ======================
     FK COLUMNS
     ====================== */

  @Column({ name: "contact_id", type: "bigint", nullable: true })
  @Index()
  contactId: string | null;

  @Column({ name: "deal_id", type: "bigint", nullable: true })
  @Index()
  dealId: string | null;

  @Column({ name: "created_by", type: "bigint" })
  @Index()
  createdBy: string;

  /* ======================
     DATA
     ====================== */

  @Column({ type: "text" })
  note: string;

  /* ======================
     DATES
     ====================== */

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  /* ======================
     RELACIONES
     ====================== */

  @ManyToOne(() => Contact, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "contact_id" })
  contact: Contact | null;

  @ManyToOne(() => Deal, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "deal_id" })
  deal: Deal | null;

  @ManyToOne(() => User, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "created_by" })
  creator: User;
}
