import { Repository } from "typeorm";
import { Seller } from "./Seller";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";
export declare class SellersService {
    private readonly repo;
    constructor(repo: Repository<Seller>);
    create(dto: CreateSellerDto): Promise<Seller>;
    findAll(): Promise<Seller[]>;
    findOne(id: number): Promise<Seller>;
    update(id: number, dto: UpdateSellerDto): Promise<Seller>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
