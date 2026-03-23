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
exports.TouchpointsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Touchpoint_1 = require("./Touchpoint");
let TouchpointsService = class TouchpointsService {
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
        if (params.campaignId)
            where.campaignId = String(params.campaignId);
        if (params.eventType)
            where.eventType = String(params.eventType);
        const [items, total] = await this.repo.findAndCount({
            where,
            relations: ["contact", "campaign"],
            order: { eventAt: "DESC" },
            skip,
            take: pageSize,
        });
        return { page, pageSize, total, items };
    }
    async get(id) {
        const tp = await this.repo.findOne({
            where: { id },
            relations: ["contact", "campaign"],
        });
        if (!tp)
            throw new common_1.NotFoundException("Touchpoint no existe");
        return tp;
    }
    async create(dto) {
        const entity = this.repo.create({
            contactId: String(dto.contactId),
            campaignId: dto.campaignId ? String(dto.campaignId) : null,
            eventType: dto.eventType,
            eventAt: dto.eventAt ? new Date(dto.eventAt) : null,
            utmSource: dto.utmSource ?? null,
            utmMedium: dto.utmMedium ?? null,
            utmCampaign: dto.utmCampaign ?? null,
            utmTerm: dto.utmTerm ?? null,
            utmContent: dto.utmContent ?? null,
            referrer: dto.referrer ?? null,
            landingUrl: dto.landingUrl ?? null,
            ipAddress: dto.ipAddress ?? null,
            userAgent: dto.userAgent ?? null,
        });
        const saved = await this.repo.save(entity);
        return this.get(String(saved.id));
    }
    async update(id, dto) {
        await this.get(id);
        const patch = {};
        if (dto.contactId !== undefined)
            patch.contactId = String(dto.contactId);
        if (dto.campaignId !== undefined)
            patch.campaignId = dto.campaignId === null ? null : String(dto.campaignId);
        if (dto.eventType !== undefined)
            patch.eventType = dto.eventType;
        if (dto.eventAt !== undefined)
            patch.eventAt = dto.eventAt === null ? null : new Date(dto.eventAt);
        if (dto.utmSource !== undefined)
            patch.utmSource = dto.utmSource;
        if (dto.utmMedium !== undefined)
            patch.utmMedium = dto.utmMedium;
        if (dto.utmCampaign !== undefined)
            patch.utmCampaign = dto.utmCampaign;
        if (dto.utmTerm !== undefined)
            patch.utmTerm = dto.utmTerm;
        if (dto.utmContent !== undefined)
            patch.utmContent = dto.utmContent;
        if (dto.referrer !== undefined)
            patch.referrer = dto.referrer;
        if (dto.landingUrl !== undefined)
            patch.landingUrl = dto.landingUrl;
        if (dto.ipAddress !== undefined)
            patch.ipAddress = dto.ipAddress;
        if (dto.userAgent !== undefined)
            patch.userAgent = dto.userAgent;
        await this.repo.update({ id }, patch);
        return this.get(id);
    }
    async remove(id) {
        await this.get(id);
        await this.repo.delete({ id });
        return { ok: true };
    }
};
exports.TouchpointsService = TouchpointsService;
exports.TouchpointsService = TouchpointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Touchpoint_1.Touchpoint)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TouchpointsService);
//# sourceMappingURL=touchpoints.service.js.map