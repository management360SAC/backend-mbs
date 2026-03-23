import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Consent } from "../../notes/consents/Consent"

@Injectable()
export class ConsentsService {
  constructor(
    @InjectRepository(Consent)
    private readonly repo: Repository<Consent>,
  ) {}

  grant(contactId: number, consentType: string) {
    return this.repo.save({
      contactId,
      consentType,
      granted: true,
      grantedAt: new Date(),
      revokedAt: null,
    });
  }

  revoke(id: number) {
    return this.repo.update(
      { id },
      { granted: false, revokedAt: new Date() },
    );
  }

  findByContact(contactId: number) {
    return this.repo.find({
      where: { contactId },
      order: { createdAt: "DESC" },
    });
  }
}
