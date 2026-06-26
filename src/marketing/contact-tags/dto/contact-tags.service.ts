import { Injectable } from "@nestjs/common";
import { TenantDataSourceService } from "../../../tenant/tenant-datasource.service";
import { ContactTag } from "../ContactTag";

@Injectable()
export class ContactTagsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async attach(contactId: number, tagId: number) {
    const repo = await this.tds.getRepository(ContactTag);
    return repo.save({ contactId, tagId });
  }

  async detach(contactId: number, tagId: number) {
    const repo = await this.tds.getRepository(ContactTag);
    return repo.delete({ contactId, tagId });
  }

  async findByContact(contactId: number) {
    const repo = await this.tds.getRepository(ContactTag);
    return repo.find({
      where: { contactId },
      relations: ["tag"],
    });
  }
}
