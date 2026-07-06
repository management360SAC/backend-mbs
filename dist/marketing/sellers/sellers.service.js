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
exports.SellersService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Seller_1 = require("./Seller");
let SellersService = class SellersService {
    tds;
    constructor(tds) {
        this.tds = tds;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(Seller_1.Seller);
        return repo.save(repo.create(dto));
    }
    async findAll() {
        const repo = await this.tds.getRepository(Seller_1.Seller);
        return repo.find({ order: { id: "DESC" } });
    }
    async findOne(id) {
        const repo = await this.tds.getRepository(Seller_1.Seller);
        const e = await repo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException("Seller no encontrado");
        return e;
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Seller_1.Seller);
        const e = await this.findOne(id);
        Object.assign(e, dto);
        return repo.save(e);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(Seller_1.Seller);
        const e = await this.findOne(id);
        await repo.remove(e);
        return { ok: true };
    }
};
exports.SellersService = SellersService;
exports.SellersService = SellersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService])
], SellersService);
//# sourceMappingURL=sellers.service.js.map