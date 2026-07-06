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
exports.LeadStagesService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const LeadStages_1 = require("../../marketing/lead-stages/LeadStages");
let LeadStagesService = class LeadStagesService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async findAll() {
        const repo = await this.tds.getRepository(LeadStages_1.LeadStage);
        return repo.find({ order: { order: "ASC" } });
    }
    async findOne(id) {
        const repo = await this.tds.getRepository(LeadStages_1.LeadStage);
        const stage = await repo.findOne({ where: { id } });
        if (!stage)
            throw new common_1.NotFoundException("Stage no encontrado");
        return stage;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(LeadStages_1.LeadStage);
        return repo.save(repo.create(dto));
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(LeadStages_1.LeadStage);
        const stage = await this.findOne(id);
        Object.assign(stage, dto);
        return repo.save(stage);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(LeadStages_1.LeadStage);
        const stage = await this.findOne(id);
        return repo.remove(stage);
    }
};
exports.LeadStagesService = LeadStagesService;
exports.LeadStagesService = LeadStagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], LeadStagesService);
//# sourceMappingURL=lead-stages.service.js.map