import { FunnelStagesService } from "./funnel-stages.service";
import { CreateFunnelStageDto } from "./dto/create-funnel-stage.dto";
import { UpdateFunnelStageDto } from "./dto/update-funnel-stage.dto";
export declare class FunnelStagesController {
    private readonly service;
    constructor(service: FunnelStagesService);
    create(dto: CreateFunnelStageDto): Promise<import("./FunnelStage").FunnelStage>;
    findAll(): Promise<import("./FunnelStage").FunnelStage[]>;
    findOne(id: string): Promise<import("./FunnelStage").FunnelStage>;
    update(id: string, dto: UpdateFunnelStageDto): Promise<import("./FunnelStage").FunnelStage>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
