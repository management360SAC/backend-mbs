import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mk_campaign_sends" })
export class CampaignSend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  campaign_id: number;

  @Column({ type: "int", nullable: true })
  contact_id: number | null;

  @Column({ type: "varchar", length: 255 })
  contact_email: string;

  @Column({ type: "varchar", length: 140, default: "" })
  contact_name: string;

  @Column({ type: "varchar", length: 20, default: "sent" })
  status: string; // 'sent' | 'failed'

  @Column({ type: "text", nullable: true })
  error_msg: string | null;

  @CreateDateColumn({ name: "sent_at" })
  sent_at: Date;
}
