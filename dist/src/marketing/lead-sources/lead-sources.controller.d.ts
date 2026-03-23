import { LeadSourcesService } from "./lead-sources.service";
import { CreateLeadSourceDto } from "./dto/create-lead-source.dto";
import { UpdateLeadSourceDto } from "./dto/update-lead-source.dto";
export declare class LeadSourcesController {
    private readonly service;
    constructor(service: LeadSourcesService);
    create(dto: CreateLeadSourceDto): Promise<import("./LeadSource").LeadSource>;
    findAll(): Promise<import("./LeadSource").LeadSource[]>;
    findOne(id: string): Promise<import("./LeadSource").LeadSource>;
    update(id: string, dto: UpdateLeadSourceDto): Promise<import("./LeadSource").LeadSource>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
