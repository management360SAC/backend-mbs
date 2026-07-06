import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Activity } from "../../marketing/activities/Activity";
import { CreateActivityDto } from "./dto/create-activity.dto";
export declare class ActivitiesService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    list(params: {
        contactId?: number;
        dealId?: number;
    }): Promise<Activity[]>;
    create(dto: CreateActivityDto): Promise<Activity>;
}
