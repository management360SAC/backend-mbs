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
import { Campaign } from "../campaigns/Campaign";

@Entity({ name: "mk_touchpoints" })
export class Touchpoint {
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

  /* ======================
     EVENT
     ====================== */

  @Column({ name: "event_type", type: "varchar", length: 60 })
  @Index()
  eventType: string;

  @Column({ name: "event_at", type: "timestamp", nullable: true })
  eventAt: Date | null;

  /* ======================
     UTM + META
     ====================== */

  @Column({ name: "utm_source", type: "varchar", length: 120, nullable: true })
  utmSource: string | null;

  @Column({ name: "utm_medium", type: "varchar", length: 120, nullable: true })
  utmMedium: string | null;

  @Column({ name: "utm_campaign", type: "varchar", length: 120, nullable: true })
  utmCampaign: string | null;

  @Column({ name: "utm_term", type: "varchar", length: 120, nullable: true })
  utmTerm: string | null;

  @Column({ name: "utm_content", type: "varchar", length: 120, nullable: true })
  utmContent: string | null;

  @Column({ name: "referrer", type: "varchar", length: 500, nullable: true })
  referrer: string | null;

  @Column({ name: "landing_url", type: "varchar", length: 1000, nullable: true })
  landingUrl: string | null;

  @Column({ name: "ip_address", type: "varchar", length: 64, nullable: true })
  ipAddress: string | null;

  @Column({ name: "user_agent", type: "varchar", length: 512, nullable: true })
  userAgent: string | null;

  /* ======================
     DATES (si en DB hay created_at)
     ====================== */

  // Si tu tabla NO tiene created_at, elimina esto.
  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  /* ======================
     RELACIONES
     ====================== */

  @ManyToOne(() => Contact, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;

  @ManyToOne(() => Campaign, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "campaign_id" })
  campaign: Campaign | null;
}
