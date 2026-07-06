import { TenantDataSourceService } from "../../tenant/tenant-datasource.service";
import { Note } from "./Note";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NotesService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    list(params: {
        page?: number;
        pageSize?: number;
        contactId?: string;
        dealId?: string;
    }): Promise<{
        page: number;
        pageSize: number;
        total: number;
        items: Note[];
    }>;
    get(id: string): Promise<Note>;
    create(dto: CreateNoteDto, createdBy: string): Promise<Note>;
    update(id: string, dto: UpdateNoteDto): Promise<Note>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
