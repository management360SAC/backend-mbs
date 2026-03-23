import { DealsService } from "./deals.service";
import { CreateDealDto } from "./dto/create-deal.dto";
import { UpdateDealDto } from "./dto/update-deal.dto";
export declare class DealsController {
    private readonly service;
    constructor(service: DealsService);
    list(page?: number, pageSize?: number): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: import("./Deal").Deal[];
    }>;
    get(id: string): Promise<import("./Deal").Deal>;
    create(dto: CreateDealDto): Promise<import("./Deal").Deal>;
    update(id: string, dto: UpdateDealDto): Promise<import("./Deal").Deal>;
    changeStage(id: string, toStageId: string): Promise<import("./Deal").Deal | null>;
}
