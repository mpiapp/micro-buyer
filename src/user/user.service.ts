import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAddDTO } from './dto/user.add.dto';
import { UserEditDTO } from './dto/user.edit.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: UserAddDTO): Promise<User> {
        return await this.userRepository.create(user);
    }

    async editUser(authId: string, user: UserEditDTO): Promise<User> {
        return await this.userRepository.update(authId, user);
    }
    
    async getUser(companyId: string): Promise<User[]> {
        return await this.userRepository.getAll(companyId);
    }

    async getUserDetail(companyId: string, authId): Promise<User> {
        return await this.userRepository.getOne(companyId, authId);
    }
}
