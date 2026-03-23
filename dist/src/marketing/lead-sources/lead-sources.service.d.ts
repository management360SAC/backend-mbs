import { Repository } from "typeorm";
import { LeadSource } from "./LeadSource";
import { CreateLeadSourceDto } from "./dto/create-lead-source.dto";
import { UpdateLeadSourceDto } from "./dto/update-lead-source.dto";
export declare class LeadSourcesService {
    private readonly repo;
    constructor(repo: Repository<LeadSource>);
    create(dto: CreateLeadSourceDto): Promise<LeadSource>;
    findAll(): Promise<LeadSource[]>;
    findOne(id: number): Promise<LeadSource>;
    update(id: number, dto: UpdateLeadSourceDto): Promise<LeadSource>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
