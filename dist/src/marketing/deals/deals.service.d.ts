import { DataSource, Repository } from "typeorm";
import { Deal } from "../../marketing/deals/Deal";
import { CreateDealDto } from "./dto/create-deal.dto";
import { UpdateDealDto } from "./dto/update-deal.dto";
import { FunnelStage } from "../funnel-stages/FunnelStage";
export declare class DealsService {
    private readonly repo;
    private readonly stagesRepo;
    private readonly dataSource;
    constructor(repo: Repository<Deal>, stagesRepo: Repository<FunnelStage>, dataSource: DataSource);
    list(params: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: Deal[];
    }>;
    get(id: string): Promise<Deal>;
    create(dto: CreateDealDto): Promise<Deal>;
    update(id: string, dto: UpdateDealDto): Promise<Deal>;
    changeStage(params: {
        dealId: string;
        toStageId: string;
        changedById?: string | null;
    }): Promise<Deal | null>;
}
