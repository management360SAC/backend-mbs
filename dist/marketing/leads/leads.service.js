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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Lead_1 = require("./Lead");
const LeadStages_1 = require("../../marketing/lead-stages/LeadStages");
const Seller_1 = require("../sellers/Seller");
let LeadsService = class LeadsService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async list(params) {
        const { q, page = 1, pageSize = 20, sourceId, sellerId, stageId } = params;
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const qb = repo
            .createQueryBuilder("lead")
            .leftJoinAndSelect("lead.source", "source")
            .leftJoinAndSelect("lead.seller", "seller")
            .leftJoinAndSelect("lead.currentStage", "stage")
            .orderBy("lead.createdAt", "DESC")
            .skip((page - 1) * pageSize)
            .take(pageSize);
        if (q) {
            qb.andWhere(new typeorm_1.Brackets((w) => {
                w.where("lead.fullName LIKE :q", { q: `%${q}%` })
                    .orWhere("lead.email LIKE :q", { q: `%${q}%` })
                    .orWhere("lead.phone LIKE :q", { q: `%${q}%` });
            }));
        }
        if (sourceId)
            qb.andWhere("source.id = :sourceId", { sourceId });
        if (sellerId)
            qb.andWhere("seller.id = :sellerId", { sellerId });
        if (stageId)
            qb.andWhere("stage.id = :stageId", { stageId });
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
        };
    }
    async get(id) {
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const lead = await repo.findOne({
            where: { id },
            relations: ["source", "seller", "currentStage"],
        });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        return lead;
    }
    async create(dto) {
        const stagesRepo = await this.tds.getRepository(LeadStages_1.LeadStage);
        const stage = await stagesRepo.findOne({ where: { id: dto.currentStageId } });
        if (!stage)
            throw new common_1.NotFoundException("Stage no válido");
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const lead = repo.create({
            fullName: dto.fullName,
            email: dto.email,
            phone: dto.phone,
            notes: dto.notes,
            expectedValue: dto.expectedValue,
            sourceId: dto.sourceId,
            sellerId: dto.sellerId,
            currentStage: stage,
        });
        return repo.save(lead);
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const lead = await repo.findOne({ where: { id } });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        Object.assign(lead, dto);
        return repo.save(lead);
    }
    async changeStage(id, currentStageId) {
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const stagesRepo = await this.tds.getRepository(LeadStages_1.LeadStage);
        const lead = await repo.findOne({ where: { id }, relations: ["currentStage"] });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        const stage = await stagesRepo.findOne({ where: { id: currentStageId } });
        if (!stage)
            throw new common_1.NotFoundException("Stage no válido");
        lead.currentStage = stage;
        return repo.save(lead);
    }
    async assignSeller(id, sellerId) {
        const repo = await this.tds.getRepository(Lead_1.Lead);
        const lead = await repo.findOne({ where: { id }, relations: ["seller"] });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        if (sellerId === null) {
            lead.seller = null;
            return repo.save(lead);
        }
        const sellersRepo = await this.tds.getRepository(Seller_1.Seller);
        const seller = await sellersRepo.findOne({ where: { id: sellerId } });
        if (!seller)
            throw new common_1.NotFoundException("Seller no válido");
        lead.seller = seller;
        return repo.save(lead);
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map