import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
export declare class LeadsController {
    private readonly service;
    constructor(service: LeadsService);
    list(q?: string, page?: number, pageSize?: number, sourceId?: number, sellerId?: number, stageId?: number): Promise<{
        items: import("./Lead").Lead[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    get(id: number): Promise<import("./Lead").Lead>;
    create(dto: CreateLeadDto): Promise<import("./Lead").Lead[]>;
    update(id: number, dto: UpdateLeadDto): Promise<import("./Lead").Lead>;
    changeStage(id: number, currentStageId: number): Promise<import("./Lead").Lead>;
    assignSeller(id: number, sellerId: number | null): Promise<import("./Lead").Lead>;
}
