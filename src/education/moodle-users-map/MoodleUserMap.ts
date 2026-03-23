import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "moodle_users_map" })
export class MoodleUserMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  contact_id: number;

  @Column({ type: "int" })
  moodle_user_id: number;

  @Column({ type: "varchar", length: 120, nullable: true })
  moodle_username: string | null;

  @CreateDateColumn()
  created_at: Date;
}
