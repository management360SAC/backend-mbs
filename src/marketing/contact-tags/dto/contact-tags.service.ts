import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactTag } from "../ContactTag";

@Injectable()
export class ContactTagsService {
  constructor(
    @InjectRepository(ContactTag)
    private readonly repo: Repository<ContactTag>,
  ) {}

  attach(contactId: number, tagId: number) {
    return this.repo.save({ contactId, tagId });
  }

  detach(contactId: number, tagId: number) {
    return this.repo.delete({ contactId, tagId });
  }

  findByContact(contactId: number) {
    return this.repo.find({
      where: { contactId },
      relations: ["tag"],
    });
  }
}
