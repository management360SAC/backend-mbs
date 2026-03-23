import { ActivityLogsService } from "./activity-logs.service";
export declare class ActivityLogsController {
    private readonly service;
    constructor(service: ActivityLogsService);
    findAll(entity_type?: string, page?: string, limit?: string): Promise<{
        data: {
            id: number;
            entity_type: any;
            entity_id: any;
            action: any;
            description: any;
            actor_name: any;
            metadata: {
                entity_name: any;
            };
            created_at: any;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
}
