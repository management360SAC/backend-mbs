import { Injectable } from "@nestjs/common";
import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Activity } from "../../marketing/activities/Activity";
import { CreateActivityDto } from "./dto/create-activity.dto";

@Injectable()
export class ActivitiesService {
  constructor(private readonly tds: TenantDataSourceService) {}

  async list(params: { contactId?: number; dealId?: number }) {
    const repo = await this.tds.getRepository(Activity);
    const where: any = {};
    if (params.contactId) where.contactId = params.contactId;
    if (params.dealId) where.dealId = params.dealId;

    return repo.find({
      where,
      order: { createdAt: "DESC" },
    });
  }

  async create(dto: CreateActivityDto) {
    const repo = await this.tds.getRepository(Activity);
    const activity = repo.create(dto);
    await repo.save(activity);
    return activity;
  }
}
