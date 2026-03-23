import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permsRepo: Repository<Permission>,
  ) {}

  async findAll() {
    return this.permsRepo.find({
      order: { module: 'ASC', action: 'ASC' },
    });
  }

  async findByModule() {
    const permissions = await this.findAll();

    const grouped = permissions.reduce((acc, perm) => {
      if (!acc[perm.module]) {
        acc[perm.module] = [];
      }
      acc[perm.module].push(perm);
      return acc;
    }, {} as Record<string, Permission[]>);

    return grouped;
  }
  
}