import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoleAddDTO } from "../dto/role.add.dto";
import { RoleEditDTO } from "../dto/role.edit.dto";
import { Role, RoleDocument } from "../schema/role.schema";

@Injectable()
export class RoleRepository {

    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

    async create(body: RoleAddDTO): Promise<Role> {
        return await this.roleModel.create(body)
    }

    async update(id: string, body: RoleEditDTO): Promise<Role> {
        return await this.roleModel.findByIdAndUpdate({_id: id}, body, { new: true , useFindAndModify: false});
    }

    async getOne(id: string): Promise<Role> {
        return await this.roleModel.findById({ _id: id });
    }

    async getAll(): Promise<Role[]> {
        return await this.roleModel.find();
    }
}