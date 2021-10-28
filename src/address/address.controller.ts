import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { addressAddDTO } from './dto/address.add.dto';
import { addressEditDTO } from './dto/address.edit.dto';

@ApiTags('Buyer Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    async create(@Body() address: addressAddDTO) {
        return await this.addressService.create(address);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() address: addressEditDTO ) {
        return await this.addressService.update(id, address);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.addressService.delete(id);
    }
}
