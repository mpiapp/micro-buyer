import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { addressAddDTO } from './dto/address.add.dto';

@ApiTags('Buyer Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    async create(@Body() address: addressAddDTO) {
        return await this.addressService.create(address);
    }
}
