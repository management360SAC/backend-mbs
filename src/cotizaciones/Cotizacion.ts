import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
// contact_id es referencia lógica a mk_contacts, sin FK decorador para evitar dep circular
import { CotizacionDetalle } from "./CotizacionDetalle";
import { CotizacionEnvio } from "./CotizacionEnvio";

export type CotizacionEstado =
  | "BORRADOR"
  | "GENERADA"
  | "ENVIADA"
  | "ACEPTADA"
  | "RECHAZADA"
  | "VENCIDA";

@Entity({ name: "cotizaciones" })
export class Cotizacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30, unique: true })
  numero: string;

  @Column({ type: "int", nullable: true })
  contact_id: number | null;

  @Column({ type: "int", nullable: true, name: "empresa_id" })
  empresa_id: number | null;

  @Column({ type: "int", nullable: true, name: "empresa_contacto_id" })
  empresa_contacto_id: number | null;

  @Column({ type: "varchar", length: 200 })
  titulo: string;

  @Column({ type: "text", nullable: true })
  observaciones: string | null;

  @Column({ type: "text", nullable: true })
  terminos: string | null;

  @Column({ type: "varchar", length: 10, default: "PEN" })
  moneda: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  descuento_pct: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  descuento_monto: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 18 })
  impuesto_pct: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  impuesto_monto: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  total: number;

  @Column({ type: "varchar", length: 20, default: "BORRADOR" })
  estado: CotizacionEstado;

  @Column({ type: "date", nullable: true })
  fecha_vigencia: string | null;

  @Column({ type: "int", nullable: true })
  created_by: number | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CotizacionDetalle, (d) => d.cotizacion, { cascade: true, eager: false })
  detalles: CotizacionDetalle[];

  @OneToMany(() => CotizacionEnvio, (e) => e.cotizacion, { cascade: false, eager: false })
  envios: CotizacionEnvio[];
}
