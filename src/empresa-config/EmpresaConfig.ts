import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "empresa_config" })
export class EmpresaConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, default: "MBS" })
  nombre: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  ruc: string | null;

  @Column({ type: "varchar", length: 300, nullable: true })
  direccion: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  telefono: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  email: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  website: string | null;

  @Column({ type: "longtext", nullable: true })
  logo_base64: string | null;

  @Column({ type: "text", nullable: true })
  terminos: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  smtp_host: string | null;

  @Column({ type: "int", nullable: true, default: 587 })
  smtp_port: number | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  smtp_user: string | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  smtp_pass: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  smtp_from: string | null;

  // ─── Facebook Lead Ads ────────────────────────────────────────────────────
  @Column({ type: "varchar", length: 200, nullable: true })
  fb_verify_token: string | null;

  @Column({ type: "text", nullable: true })
  fb_page_access_token: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
