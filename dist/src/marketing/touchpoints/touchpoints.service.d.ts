import { Repository } from "typeorm";
import { Touchpoint } from "./Touchpoint";
import { CreateTouchpointDto } from "./dto/create-touchpoint.dto";
import { UpdateTouchpointDto } from "./dto/update-touchpoint.dto";
export declare class TouchpointsService {
    private readonly repo;
    constructor(repo: Repository<Touchpoint>);
    list(params: {
        page?: number;
        pageSize?: number;
        contactId?: string;
        campaignId?: string;
        eventType?: string;
    }): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: Touchpoint[];
    }>;
    get(id: string): Promise<Touchpoint>;
    create(dto: CreateTouchpointDto): Promise<Touchpoint>;
    update(id: string, dto: UpdateTouchpointDto): Promise<Touchpoint>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
