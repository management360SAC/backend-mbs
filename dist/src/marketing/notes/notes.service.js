"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Note_1 = require("./Note");
let NotesService = class NotesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async list(params) {
        const page = params.page ?? 1;
        const pageSize = params.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (params.contactId)
            where.contactId = String(params.contactId);
        if (params.dealId)
            where.dealId = String(params.dealId);
        const [items, total] = await this.repo.findAndCount({
            where,
            relations: ["contact", "deal", "creator"],
            order: { createdAt: "DESC" },
            skip,
            take: pageSize,
        });
        return { page, pageSize, total, items };
    }
    async get(id) {
        const note = await this.repo.findOne({
            where: { id },
            relations: ["contact", "deal", "creator"],
        });
        if (!note)
            throw new common_1.NotFoundException("Note no existe");
        return note;
    }
    async create(dto, createdBy) {
        if (!dto.contactId && !dto.dealId) {
            throw new common_1.BadRequestException("Debes enviar contactId o dealId.");
        }
        const entity = this.repo.create({
            note: dto.note,
            contactId: dto.contactId ? String(dto.contactId) : null,
            dealId: dto.dealId ? String(dto.dealId) : null,
            createdBy: String(createdBy),
        });
        const saved = await this.repo.save(entity);
        return this.get(String(saved.id));
    }
    async update(id, dto) {
        await this.get(id);
        const patch = {};
        if (dto.note !== undefined)
            patch.note = dto.note;
        if (dto.contactId !== undefined)
            patch.contactId = dto.contactId === null ? null : String(dto.contactId);
        if (dto.dealId !== undefined)
            patch.dealId = dto.dealId === null ? null : String(dto.dealId);
        await this.repo.update({ id }, patch);
        return this.get(id);
    }
    async remove(id) {
        await this.get(id);
        await this.repo.delete({ id });
        return { ok: true };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Note_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map