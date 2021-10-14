import { Injectable } from '@nestjs/common';
import { RoleAddDTO } from './dto/role.add.dto';
import { RoleEditDTO } from './dto/role.edit.dto';
import { RoleRepository } from './repository/role.repository';
import { Role } from './schema/role.schema';

@Injectable()
export class RoleService {

    constructor(private roleRepository: RoleRepository) {}

    async createRole(role: RoleAddDTO): Promise<Role> {
        return await this.roleRepository.create(role);
    }

    async editRole(id: string, role: RoleEditDTO): Promise<Role> {
        return await this.roleRepository.update(id, role);
    }

    async getRole(id: string): Promise<Role> {
        return await this.roleRepository.getOne(id);
    }

    async getAllRole(): Promise<Role[]> {
        return await this.roleRepository.getAll();
    }
}
