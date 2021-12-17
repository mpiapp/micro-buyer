import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { addressAddDTO } from './dto/address.add.dto';
import { addressEditDTO } from './dto/address.edit.dto';

@ApiTags('Buyer Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @MessagePattern('buyer.add.address')
    async create(@Payload() payload: any) {
        return await this.addressService.create(payload.value);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() address: addressEditDTO ) {
        return await this.addressService.update(id, address);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.addressService.delete(id);
    }

    @MessagePattern('buyer.get.address')
    async getAddress(@Payload() payload: any): Promise<any>  {
        return await this.addressService.get(payload.value.buyer_id);
    }

    @MessagePattern('buyer.get.default.address')
    async getDefaultAddress(@Payload() payload: any): Promise<any>  {
        return await this.addressService.get(payload.value.buyer_id);
    }
}
