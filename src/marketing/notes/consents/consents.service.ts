import { Injectable } from "@nestjs/common";
import { TenantDataSourceService } from "../../../tenant/tenant-datasource.service";
import { Consent } from "../../notes/consents/Consent";

@Injectable()
export class ConsentsService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async grant(contactId: number, consentType: string) {
    const repo = await this.tds.getRepository(Consent);
    return repo.save({
      contactId,
      consentType,
      granted: true,
      grantedAt: new Date(),
      revokedAt: null,
    });
  }

  async revoke(id: number) {
    const repo = await this.tds.getRepository(Consent);
    return repo.update({ id }, { granted: false, revokedAt: new Date() });
  }

  async findByContact(contactId: number) {
    const repo = await this.tds.getRepository(Consent);
    return repo.find({ where: { contactId }, order: { createdAt: "DESC" } });
  }
}
