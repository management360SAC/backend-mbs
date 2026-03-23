import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { FunnelStage } from "../funnel-stages/FunnelStage";

/** Relación many-to-many entre Campaña y Etapas del Embudo de Ventas */
@Entity({ name: "mk_campaign_funnels" })
export class CampaignFunnel {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  campaign_id: number;

  @PrimaryColumn({ type: "bigint", unsigned: true })
  funnel_stage_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Campaign, { onDelete: "CASCADE" })
  @JoinColumn({ name: "campaign_id" })
  campaign: Campaign;

  @ManyToOne(() => FunnelStage, { onDelete: "CASCADE" })
  @JoinColumn({ name: "funnel_stage_id" })
  funnel_stage: FunnelStage;
}
