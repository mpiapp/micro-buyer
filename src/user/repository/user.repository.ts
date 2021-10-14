import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { UserAddDTO } from '../dto/user.add.dto';
import { UserEditDTO } from '../dto/user.edit.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserRepository {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: UserAddDTO): Promise<User> {
        return await this.userModel.create(user);
    }
    
    async update(authId: string, user: UserEditDTO): Promise<User> {
        return await this.userModel.findOneAndUpdate({auth_id: authId}, user, { new: true , useFindAndModify: false});
    }

    async getAll(companyId: string): Promise<User[]> {
        return await this.userModel.find({ company_id: companyId});
    }

    async getOne(companyId: string, authId: string): Promise<User> {
        return await this.userModel.findOne({ company_id: companyId, auth_id: authId});
    }
}