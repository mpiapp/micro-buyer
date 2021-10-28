import { Injectable } from '@nestjs/common';
import { addressAddDTO } from './dto/address.add.dto';
import { AddressRepository } from './respository/address.repository';

@Injectable()
export class AddressService {
    constructor(private readonly addressRepository: AddressRepository) {}

    async create(address: addressAddDTO) {
        return await this.addressRepository.create(address);
    }
}
