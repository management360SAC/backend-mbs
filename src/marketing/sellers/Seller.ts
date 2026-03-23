import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "mk_sellers" })
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: 140 })
  full_name: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  email: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  phone: string | null;

  @Column({ type: "bool", default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
