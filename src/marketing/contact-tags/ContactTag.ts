import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Contact } from "../contacts/Contact";
import { Tag } from "../tags/Tag";

@Entity({ name: "mk_contact_tags" })
export class ContactTag {
  @PrimaryColumn({ name: "contact_id", type: "int" })
  contactId: number;

  @PrimaryColumn({ name: "tag_id", type: "int" })
  tagId: number;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;

  @ManyToOne(() => Tag, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tag_id" })
  tag: Tag;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;
}
