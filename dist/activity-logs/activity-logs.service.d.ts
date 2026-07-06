import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
export declare class ActivityLogsService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    getRecentActivity(params: {
        entity_type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
