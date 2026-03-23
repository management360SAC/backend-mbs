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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Contact_1 = require("./Contact");
let ContactsService = class ContactsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async findAll(filters) {
        const qb = this.repo.createQueryBuilder("c");
        if (filters?.type)
            qb.andWhere("c.type = :type", { type: filters.type });
        if (filters?.status)
            qb.andWhere("c.status = :status", { status: filters.status });
        if (filters?.source_id)
            qb.andWhere("c.source_id = :source_id", { source_id: filters.source_id });
        if (filters?.q) {
            qb.andWhere("(c.full_name LIKE :q OR c.email LIKE :q OR c.phone LIKE :q)", { q: `%${filters.q}%` });
        }
        qb.orderBy("c.id", "DESC");
        return qb.getMany();
    }
    async findOne(id) {
        const e = await this.repo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException("Contacto no encontrado");
        return e;
    }
    async update(id, dto) {
        const e = await this.findOne(id);
        Object.assign(e, dto);
        return this.repo.save(e);
    }
    async remove(id) {
        const e = await this.findOne(id);
        await this.repo.remove(e);
        return { ok: true };
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Contact_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map