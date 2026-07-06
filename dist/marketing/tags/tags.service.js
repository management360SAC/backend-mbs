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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Tag_1 = require("./Tag");
let TagsService = class TagsService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async findAll() {
        const repo = await this.tds.getRepository(Tag_1.Tag);
        return repo.find({ order: { name: "ASC" } });
    }
    async findOne(id) {
        const repo = await this.tds.getRepository(Tag_1.Tag);
        const tag = await repo.findOne({ where: { id } });
        if (!tag)
            throw new common_1.NotFoundException("Tag no encontrado");
        return tag;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(Tag_1.Tag);
        const tag = repo.create(dto);
        return repo.save(tag);
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Tag_1.Tag);
        const tag = await this.findOne(id);
        Object.assign(tag, dto);
        return repo.save(tag);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(Tag_1.Tag);
        const tag = await this.findOne(id);
        return repo.remove(tag);
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], TagsService);
//# sourceMappingURL=tags.service.js.map