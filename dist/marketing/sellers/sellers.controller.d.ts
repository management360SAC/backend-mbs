import { SellersService } from "./sellers.service";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";
export declare class SellersController {
    private readonly service;
    constructor(service: SellersService);
    create(dto: CreateSellerDto): Promise<import("./Seller").Seller>;
    findAll(): Promise<import("./Seller").Seller[]>;
    findOne(id: string): Promise<import("./Seller").Seller>;
    update(id: string, dto: UpdateSellerDto): Promise<import("./Seller").Seller>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
