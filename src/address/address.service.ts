import { Injectable } from '@nestjs/common';
import { addressAddDTO } from './dto/address.add.dto';
import { addressEditDTO } from './dto/address.edit.dto';
import { AddressRepository } from './respository/address.repository';

@Injectable()
export class AddressService {
    constructor(private readonly addressRepository: AddressRepository) {}

    async create(address: addressAddDTO) {
        return await this.addressRepository.create(address);
    }

    async update(id: string,address: addressEditDTO) {
        return await this.addressRepository.update(id, address);
    }
}
