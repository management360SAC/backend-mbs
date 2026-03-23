import { Repository } from "typeorm";
import { Tag } from "./Tag";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
export declare class TagsService {
    private readonly repo;
    constructor(repo: Repository<Tag>);
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    create(dto: CreateTagDto): Promise<Tag>;
    update(id: number, dto: UpdateTagDto): Promise<Tag>;
    remove(id: number): Promise<Tag>;
}
