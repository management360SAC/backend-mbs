import { Repository } from "typeorm";
import { LeadStage } from "../../marketing/lead-stages/LeadStages";
import { CreateLeadStageDto } from "./dto/create-lead-stage.dto";
import { UpdateLeadStageDto } from "./dto/update-lead-stage.dto";
export declare class LeadStagesService {
    private readonly repo;
    constructor(repo: Repository<LeadStage>);
    findAll(): Promise<LeadStage[]>;
    findOne(id: number): Promise<LeadStage>;
    create(dto: CreateLeadStageDto): Promise<LeadStage>;
    update(id: number, dto: UpdateLeadStageDto): Promise<LeadStage>;
    remove(id: number): Promise<LeadStage>;
}
