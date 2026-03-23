import { Repository } from "typeorm";
import { MoodleUserMap } from "./MoodleUserMap";
import { CreateMoodleUserMapDto } from "./dto/create-moodle-user-map.dto";
import { UpdateMoodleUserMapDto } from "./dto/update-moodle-user-map.dto";
export declare class MoodleUsersMapService {
    private readonly repo;
    constructor(repo: Repository<MoodleUserMap>);
    create(dto: CreateMoodleUserMapDto): Promise<MoodleUserMap>;
    findAll(): Promise<MoodleUserMap[]>;
    findOne(id: number): Promise<MoodleUserMap>;
    update(id: number, dto: UpdateMoodleUserMapDto): Promise<MoodleUserMap>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
