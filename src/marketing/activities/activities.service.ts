import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Activity } from "../../marketing/activities/Activity";
import { CreateActivityDto } from "./dto/create-activity.dto";

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly repo: Repository<Activity>,
  ) {}

  async list(params: { contactId?: number; dealId?: number }) {
    const where: any = {};
    if (params.contactId) where.contactId = params.contactId;
    if (params.dealId) where.dealId = params.dealId;

    return this.repo.find({
      where,
      order: { createdAt: "DESC" },
    });
  }

  async create(dto: CreateActivityDto) {
    const activity = this.repo.create(dto);
    await this.repo.save(activity);
    return activity;
  }
}