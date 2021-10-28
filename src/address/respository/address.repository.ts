import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { addressAddDTO } from '../dto/address.add.dto';
import { addressEditDTO } from '../dto/address.edit.dto';
import { Address, AddressDocument } from '../schema/address.schema';

@Injectable()
export class AddressRepository {

    constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

    async create(address: addressAddDTO): Promise<Address> {
        return await this.addressModel.create(address);
    }

    async update(id: string, address: addressEditDTO) {
        return await this.addressModel.findByIdAndUpdate(id, address, { new: true , useFindAndModify: false});
    }
}