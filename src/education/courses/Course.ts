import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "edu_courses" })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60 })
  code: string;

  @Column({ type: "varchar", length: 140 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  price: string | null;

  @Column({ type: "varchar", length: 10, default: "PEN" })
  currency: string;

  @Column({ name: "is_active", type: "bool", default: true })
  isActive: boolean;

  @Column({ name: "moodle_course_id", type: "int", nullable: true })
  moodleCourseId: number | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
