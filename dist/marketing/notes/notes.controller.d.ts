import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NotesController {
    private readonly service;
    constructor(service: NotesService);
    list(page?: number, pageSize?: number, contactId?: string, dealId?: string): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: import("./Note").Note[];
    }>;
    get(id: string): Promise<import("./Note").Note>;
    create(dto: CreateNoteDto, req: any): Promise<import("./Note").Note>;
    update(id: string, dto: UpdateNoteDto): Promise<import("./Note").Note>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
