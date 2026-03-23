import { Repository } from "typeorm";
import { FunnelStage } from "./FunnelStage";
import { CreateFunnelStageDto } from "./dto/create-funnel-stage.dto";
import { UpdateFunnelStageDto } from "./dto/update-funnel-stage.dto";
export declare class FunnelStagesService {
    private readonly repo;
    constructor(repo: Repository<FunnelStage>);
    create(dto: CreateFunnelStageDto): Promise<FunnelStage>;
    findAll(): Promise<FunnelStage[]>;
    findOne(id: number): Promise<FunnelStage>;
    update(id: number, dto: UpdateFunnelStageDto): Promise<FunnelStage>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
