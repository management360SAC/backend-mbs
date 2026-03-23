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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Lead_1 = require("./Lead");
const LeadStages_1 = require("../../marketing/lead-stages/LeadStages");
const Seller_1 = require("../sellers/Seller");
const LeadSource_1 = require("../lead-sources/LeadSource");
let LeadsService = class LeadsService {
    leadsRepo;
    stagesRepo;
    sellersRepo;
    sourcesRepo;
    constructor(leadsRepo, stagesRepo, sellersRepo, sourcesRepo) {
        this.leadsRepo = leadsRepo;
        this.stagesRepo = stagesRepo;
        this.sellersRepo = sellersRepo;
        this.sourcesRepo = sourcesRepo;
    }
    async list(params) {
        const { q, page = 1, pageSize = 20, sourceId, sellerId, stageId } = params;
        const qb = this.leadsRepo
            .createQueryBuilder("lead")
            .leftJoinAndSelect("lead.source", "source")
            .leftJoinAndSelect("lead.seller", "seller")
            .leftJoinAndSelect("lead.currentStage", "stage")
            .orderBy("lead.createdAt", "DESC")
            .skip((page - 1) * pageSize)
            .take(pageSize);
        if (q) {
            qb.andWhere(new typeorm_2.Brackets((w) => {
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
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async get(id) {
        const lead = await this.leadsRepo.findOne({
            where: { id },
            relations: ["source", "seller", "currentStage"],
        });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        return lead;
    }
    async create(dto) {
        const stage = await this.stagesRepo.findOne({
            where: { id: dto.currentStageId },
        });
        if (!stage)
            throw new common_1.NotFoundException("Stage no válido");
        const lead = this.leadsRepo.create({
            fullName: dto.fullName,
            email: dto.email,
            phone: dto.phone,
            notes: dto.notes,
            expectedValue: dto.expectedValue,
            sourceId: dto.sourceId,
            sellerId: dto.sellerId,
            currentStage: stage,
        });
        return this.leadsRepo.save(lead);
    }
    async update(id, dto) {
        const lead = await this.leadsRepo.findOne({ where: { id } });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        Object.assign(lead, dto);
        return this.leadsRepo.save(lead);
    }
    async changeStage(id, currentStageId) {
        const lead = await this.leadsRepo.findOne({
            where: { id },
            relations: ["currentStage"],
        });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        const stage = await this.stagesRepo.findOne({
            where: { id: currentStageId },
        });
        if (!stage)
            throw new common_1.NotFoundException("Stage no válido");
        lead.currentStage = stage;
        return this.leadsRepo.save(lead);
    }
    async assignSeller(id, sellerId) {
        const lead = await this.leadsRepo.findOne({
            where: { id },
            relations: ["seller"],
        });
        if (!lead)
            throw new common_1.NotFoundException("Lead no encontrado");
        if (sellerId === null) {
            lead.seller = null;
            return this.leadsRepo.save(lead);
        }
        const seller = await this.sellersRepo.findOne({ where: { id: sellerId } });
        if (!seller)
            throw new common_1.NotFoundException("Seller no válido");
        lead.seller = seller;
        return this.leadsRepo.save(lead);
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Lead_1.Lead)),
    __param(1, (0, typeorm_1.InjectRepository)(LeadStages_1.LeadStage)),
    __param(2, (0, typeorm_1.InjectRepository)(Seller_1.Seller)),
    __param(3, (0, typeorm_1.InjectRepository)(LeadSource_1.LeadSource)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LeadsService);
//# sourceMappingURL=leads.service.js.map