import { MoodleUsersMapService } from "./moodle-users-map.service";
import { CreateMoodleUserMapDto } from "./dto/create-moodle-user-map.dto";
import { UpdateMoodleUserMapDto } from "./dto/update-moodle-user-map.dto";
export declare class MoodleUsersMapController {
    private readonly service;
    constructor(service: MoodleUsersMapService);
    create(dto: CreateMoodleUserMapDto): Promise<import("./MoodleUserMap").MoodleUserMap>;
    findAll(): Promise<import("./MoodleUserMap").MoodleUserMap[]>;
    findOne(id: number): Promise<import("./MoodleUserMap").MoodleUserMap>;
    update(id: number, dto: UpdateMoodleUserMapDto): Promise<import("./MoodleUserMap").MoodleUserMap>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
