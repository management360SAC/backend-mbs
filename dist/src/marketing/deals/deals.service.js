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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Deal_1 = require("../../marketing/deals/Deal");
const FunnelStage_1 = require("../funnel-stages/FunnelStage");
const DealStageHistory_1 = require("../deal-stage-history/DealStageHistory");
let DealsService = class DealsService {
    repo;
    stagesRepo;
    dataSource;
    constructor(repo, stagesRepo, dataSource) {
        this.repo = repo;
        this.stagesRepo = stagesRepo;
        this.dataSource = dataSource;
    }
    async list(params) {
        const page = params.page ?? 1;
        const pageSize = params.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const [items, total] = await this.repo.findAndCount({
            relations: ["contact", "campaign", "stage", "owner", "creator"],
            skip,
            take: pageSize,
            order: { createdAt: "DESC" },
        });
        return { page, pageSize, total, items };
    }
    async get(id) {
        const deal = await this.repo.findOne({
            where: { id },
            relations: ["contact", "campaign", "stage", "owner", "creator"],
        });
        if (!deal)
            throw new common_1.NotFoundException("Deal no existe");
        return deal;
    }
    async create(dto) {
        const stageId = dto.stageId;
        if (stageId !== undefined && stageId !== null) {
            const st = await this.stagesRepo.findOne({
                where: { id: String(stageId) },
            });
            if (!st)
                throw new common_1.NotFoundException("Stage no existe");
        }
        const payload = {
            contactId: dto.contactId !== undefined && dto.contactId !== null ? String(dto.contactId) : undefined,
            campaignId: dto.campaignId !== undefined && dto.campaignId !== null ? String(dto.campaignId) : null,
            stageId: stageId !== undefined && stageId !== null ? String(stageId) : undefined,
            ownerUserId: dto.ownerUserId !== undefined && dto.ownerUserId !== null ? String(dto.ownerUserId) : null,
            createdBy: dto.createdBy !== undefined && dto.createdBy !== null ? String(dto.createdBy) : undefined,
            title: dto.title,
            amount: dto.amount !== undefined && dto.amount !== null ? String(dto.amount) : "0",
            currency: dto.currency ?? "PEN",
            probability: dto.probability ?? null,
            expectedCloseDate: dto.expectedCloseDate ? new Date(dto.expectedCloseDate) : null,
            status: dto.status ?? "open",
            lostReason: dto.lostReason ?? null,
        };
        const entity = this.repo.create(payload);
        const saved = await this.repo.save(entity);
        return this.get(String(saved.id));
    }
    async update(id, dto) {
        await this.get(id);
        if (dto.stageId) {
            throw new common_1.BadRequestException("Para cambiar de etapa usa el endpoint de changeStage.");
        }
        await this.repo.update({ id }, dto);
        return this.get(id);
    }
    async changeStage(params) {
        const { dealId, toStageId, changedById = null } = params;
        return this.dataSource.transaction(async (manager) => {
            const dealRepo = manager.getRepository(Deal_1.Deal);
            const stageRepo = manager.getRepository(FunnelStage_1.FunnelStage);
            const historyRepo = manager.getRepository(DealStageHistory_1.DealStageHistory);
            const deal = await dealRepo.findOne({ where: { id: dealId } });
            if (!deal)
                throw new common_1.NotFoundException("Deal no existe");
            const toStage = await stageRepo.findOne({ where: { id: String(toStageId) } });
            if (!toStage)
                throw new common_1.NotFoundException("Stage destino no existe");
            const fromStageId = String(deal.stageId);
            if (fromStageId === String(toStageId)) {
                throw new common_1.BadRequestException("El deal ya está en esa etapa");
            }
            deal.stageId = String(toStageId);
            await dealRepo.save(deal);
            await historyRepo.save({
                deal_id: String(deal.id),
                from_stage_id: Number(fromStageId),
                to_stage_id: Number(String(toStageId)),
                changed_by_id: changedById ? Number(String(changedById)) : null,
            });
            return dealRepo.findOne({
                where: { id: dealId },
                relations: ["contact", "campaign", "stage", "owner", "creator"],
            });
        });
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Deal_1.Deal)),
    __param(1, (0, typeorm_1.InjectRepository)(FunnelStage_1.FunnelStage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], DealsService);
//# sourceMappingURL=deals.service.js.map