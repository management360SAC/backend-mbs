import { Repository } from "typeorm";
import { Activity } from "../../marketing/activities/Activity";
import { CreateActivityDto } from "./dto/create-activity.dto";
export declare class ActivitiesService {
    private readonly repo;
    constructor(repo: Repository<Activity>);
    list(params: {
        contactId?: number;
        dealId?: number;
    }): Promise<Activity[]>;
    create(dto: CreateActivityDto): Promise<Activity>;
}
