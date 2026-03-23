import { LeadStagesService } from "./lead-stages.service";
import { CreateLeadStageDto } from "./dto/create-lead-stage.dto";
import { UpdateLeadStageDto } from "./dto/update-lead-stage.dto";
export declare class LeadStagesController {
    private readonly service;
    constructor(service: LeadStagesService);
    list(): Promise<import("./LeadStages").LeadStage[]>;
    get(id: number): Promise<import("./LeadStages").LeadStage>;
    create(dto: CreateLeadStageDto): Promise<import("./LeadStages").LeadStage>;
    update(id: number, dto: UpdateLeadStageDto): Promise<import("./LeadStages").LeadStage>;
    remove(id: number): Promise<import("./LeadStages").LeadStage>;
}
