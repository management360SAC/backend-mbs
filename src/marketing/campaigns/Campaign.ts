import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/** Tipos de campaña soportados. Escalable: agregar aquí sin romper lo existente. */
export const CAMPAIGN_TYPES = ["EMAIL", "FACEBOOK", "WHATSAPP", "SMS", "LANDING", "OTHER"] as const;
export type CampaignType = (typeof CAMPAIGN_TYPES)[number];

/** Estados de campaña */
export const CAMPAIGN_STATUSES = ["draft", "active", "paused", "completed", "inactive"] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

@Entity({ name: "mk_campaigns" })
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 120 })
  name: string;

  /** Tipo de campaña: EMAIL | FACEBOOK | WHATSAPP | SMS | LANDING | OTHER */
  @Column({ type: "varchar", length: 30, default: "EMAIL" })
  type: CampaignType;

  /** URL principal de la campaña (enlace externo, post, landing, etc.) */
  @Column({ type: "text", nullable: true })
  url: string | null;

  @Column({ type: "varchar", length: 30, default: "draft" })
  status: string;

  @Column({ type: "date", nullable: true })
  start_date: string | null;

  @Column({ type: "date", nullable: true })
  end_date: string | null;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  budget: string | null;

  // ─── Campos específicos de Email ──────────────────────────────────────────
  @Column({ type: "varchar", length: 30, default: "email" })
  channel: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  subject: string | null;

  @Column({ type: "longtext", nullable: true })
  body_html: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  sender_name: string | null;

  // ─── Recursos adicionales ─────────────────────────────────────────────────
  @Column({ type: "text", nullable: true })
  recursos: string | null;

  @Column({ type: "int", nullable: true })
  created_by: number | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
