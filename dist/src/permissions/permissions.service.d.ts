import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
export declare class PermissionsService {
    private readonly permsRepo;
    constructor(permsRepo: Repository<Permission>);
    findAll(): Promise<Permission[]>;
    findByModule(): Promise<Record<string, Permission[]>>;
}
