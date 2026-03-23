import { Repository } from "typeorm";
import { Segment } from "./Segment";
import { CreateSegmentDto } from "./dto/create-segment.dto";
import { UpdateSegmentDto } from "./dto/update-segment.dto";
export declare class SegmentsService {
    private readonly repo;
    constructor(repo: Repository<Segment>);
    create(dto: CreateSegmentDto): Promise<Segment>;
    findAll(): Promise<Segment[]>;
    findOne(id: number): Promise<Segment>;
    update(id: number, dto: UpdateSegmentDto): Promise<Segment>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
