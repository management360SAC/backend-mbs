import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cotizacion } from "./Cotizacion";

@Entity({ name: "cotizacion_envio" })
export class CotizacionEnvio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  cotizacion_id: number;

  @Column({ type: "varchar", length: 150 })
  email_destino: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  asunto: string | null;

  @Column({ type: "text", nullable: true })
  mensaje: string | null;

  @Column({ type: "int", nullable: true })
  enviado_por: number | null;

  @Column({ type: "varchar", length: 20, default: "PENDIENTE" })
  resultado: string;

  @Column({ type: "text", nullable: true })
  error_msg: string | null;

  @CreateDateColumn()
  enviado_at: Date;

  @ManyToOne(() => Cotizacion, (c) => c.envios, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cotizacion_id" })
  cotizacion: Cotizacion;
}
