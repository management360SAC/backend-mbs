import { ActivitiesService } from "./activities.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
export declare class ActivitiesController {
    private readonly service;
    constructor(service: ActivitiesService);
    list(contactId?: number, dealId?: number): Promise<import("./Activity").Activity[]>;
    create(dto: CreateActivityDto): Promise<import("./Activity").Activity>;
}
