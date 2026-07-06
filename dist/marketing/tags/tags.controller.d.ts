import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
export declare class TagsController {
    private readonly service;
    constructor(service: TagsService);
    list(): Promise<import("./Tag").Tag[]>;
    create(dto: CreateTagDto): Promise<import("./Tag").Tag>;
    update(id: number, dto: UpdateTagDto): Promise<import("./Tag").Tag>;
    remove(id: number): Promise<import("./Tag").Tag>;
}
