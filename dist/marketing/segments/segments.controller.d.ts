import { SegmentsService } from "./segments.service";
import { CreateSegmentDto } from "./dto/create-segment.dto";
import { UpdateSegmentDto } from "./dto/update-segment.dto";
export declare class SegmentsController {
    private readonly service;
    constructor(service: SegmentsService);
    create(dto: CreateSegmentDto): Promise<import("./Segment").Segment>;
    findAll(): Promise<import("./Segment").Segment[]>;
    findOne(id: string): Promise<import("./Segment").Segment>;
    update(id: string, dto: UpdateSegmentDto): Promise<import("./Segment").Segment>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
