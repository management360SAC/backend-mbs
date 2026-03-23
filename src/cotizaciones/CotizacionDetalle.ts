import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cotizacion } from "./Cotizacion";

@Entity({ name: "cotizacion_detalle" })
export class CotizacionDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  cotizacion_id: number;

  @Column({ type: "varchar", length: 300 })
  descripcion: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 1 })
  cantidad: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  precio_unitario: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  descuento_pct: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: "int", default: 0 })
  orden: number;

  @ManyToOne(() => Cotizacion, (c) => c.detalles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cotizacion_id" })
  cotizacion: Cotizacion;
}
