import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EmpresaContacto } from "./EmpresaContacto";

@Entity({ name: "mk_empresa_cliente" })
export class EmpresaCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 10, default: "empresa" })
  type: string; // 'empresa' | 'persona'

  // ── Empresa fields ──────────────────────────────────────────────────────
  @Column({ type: "varchar", length: 200, nullable: true })
  razon_social: string | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  nombre_comercial: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  ruc: string | null;

  // ── Persona fields ──────────────────────────────────────────────────────
  @Column({ type: "varchar", length: 200, nullable: true })
  nombre_completo: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  documento_id: string | null; // DNI / cédula

  @Column({ type: "varchar", length: 300, nullable: true })
  direccion: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  telefono: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  email: string | null;

  @Column({ type: "varchar", length: 20, default: "activo" })
  estado: string;

  @Column({ type: "text", nullable: true })
  observaciones: string | null;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @OneToMany(() => EmpresaContacto, (c) => c.empresa, { cascade: false, eager: false })
  contactos: EmpresaContacto[];
}
