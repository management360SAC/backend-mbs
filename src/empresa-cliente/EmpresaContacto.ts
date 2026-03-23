import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmpresaCliente } from "./EmpresaCliente";

@Entity({ name: "mk_empresa_contacto" })
export class EmpresaContacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "empresa_id" })
  empresa_id: number;

  @ManyToOne(() => EmpresaCliente, (e) => e.contactos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "empresa_id" })
  empresa: EmpresaCliente;

  @Column({ type: "varchar", length: 100 })
  nombres: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  apellidos: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  cargo: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  correo: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  telefono: string | null;

  @Column({ type: "varchar", length: 20, default: "activo" })
  estado: string;

  @Column({ type: "tinyint", name: "is_principal", default: 0 })
  is_principal: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
