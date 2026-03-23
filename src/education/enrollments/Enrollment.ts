import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Contact } from "../../marketing/contacts/Contact";
import { Course } from "../../education/courses/Course";
import { Deal } from "../../marketing/deals/Deal";

@Entity({ name: "edu_enrollments" })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: "contact_id", type: "int" })
  contactId: number;

  @Column({ name: "course_id", type: "int" })
  courseId: number;

  @Column({ name: "deal_id", type: "int", nullable: true })
  dealId: number | null;

  @Column({ type: "varchar", length: 30, default: "pending" })
  status: string;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  amount: string | null;

  @Column({ type: "varchar", length: 10, default: "PEN" })
  currency: string;

  @Column({ name: "moodle_enrolled_at", type: "timestamp", nullable: true })
  moodleEnrolledAt: Date | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // Relaciones
  @ManyToOne(() => Contact, { nullable: false })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;

  @ManyToOne(() => Course, { nullable: false })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @ManyToOne(() => Deal, { nullable: true })
  @JoinColumn({ name: "deal_id" })
  deal: Deal | null;
}