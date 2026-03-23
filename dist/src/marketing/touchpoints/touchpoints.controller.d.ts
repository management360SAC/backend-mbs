import { TouchpointsService } from "./touchpoints.service";
import { CreateTouchpointDto } from "./dto/create-touchpoint.dto";
import { UpdateTouchpointDto } from "./dto/update-touchpoint.dto";
export declare class TouchpointsController {
    private readonly service;
    constructor(service: TouchpointsService);
    list(page?: number, pageSize?: number, contactId?: string, campaignId?: string, eventType?: string): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: import("./Touchpoint").Touchpoint[];
    }>;
    get(id: string): Promise<import("./Touchpoint").Touchpoint>;
    create(dto: CreateTouchpointDto): Promise<import("./Touchpoint").Touchpoint>;
    update(id: string, dto: UpdateTouchpointDto): Promise<import("./Touchpoint").Touchpoint>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
