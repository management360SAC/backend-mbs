import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "edu_payments" })
export class EduPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "contact_id", type: "int" })
  contactId: number;

  @Column({ name: "course_id", type: "int" })
  courseId: number;

  @Column({ name: "enrollment_id", type: "int", nullable: true })
  enrollmentId: number | null;

  @Column({ name: "payment_type", type: "varchar", length: 20, default: "advance" })
  paymentType: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  amount: string;

  @Column({ type: "varchar", length: 10, default: "PEN" })
  currency: string;

  @Column({ name: "payment_method", type: "varchar", length: 50, default: "transferencia" })
  paymentMethod: string;

  @Column({ name: "payment_date", type: "date" })
  paymentDate: string;

  @Column({ type: "text", nullable: true })
  note: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
