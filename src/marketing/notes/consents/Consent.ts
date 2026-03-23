import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Contact } from "../../contacts/Contact";

@Entity({ name: "mk_consents" })
export class Consent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "contact_id", type: "int" })
  contactId: number;

  @Column({ name: "consent_type", type: "varchar", length: 40 })
  consentType: string;

  @Column({ type: "boolean", default: true })
  granted: boolean;

  @Column({ name: "granted_at", type: "timestamp", nullable: true })
  grantedAt: Date | null;

  @Column({ name: "revoked_at", type: "timestamp", nullable: true })
  revokedAt: Date | null;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;
}
