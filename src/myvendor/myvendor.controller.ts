import { Controller, Post, Body, BadRequestException, Put, Param, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MyvendorAddDTO } from './dto/myvendor.add.dto';
import { MyvendorDeleteDTO } from './dto/myvendor.delete.dto';
import { MyvendorEditDTO } from './dto/myvendor.edit.dto';
import { MyvendorService } from './myvendor.service';
import { Myvendor } from './schema/myvendor.schema';

@ApiTags('Prefered Vendor List Module')
@Controller('myvendor')
export class MyvendorController {
    constructor(private readonly myvendorService: MyvendorService) {}

    @Get()
    async getAll(): Promise<Myvendor[]> {
        return await this.myvendorService.getAll();
    }

    @Get('/:company_id')
    async getbyVendor(@Param('company_id') company_id: string): Promise<Myvendor[]> {
        try {
            return await this.myvendorService.getbyVendor(company_id);
        }
        catch(exception) {
            throw new BadRequestException(exception.message)
        }
    }


    @Get('/:company_id/:vendor_id')
    async getbyBuyer(@Param('company_id') company_id: string, @Param('vendor_id') vendor_id: string): Promise<Myvendor> {
        try {
            return await this.myvendorService.getbyBuyer(company_id, vendor_id);
        }
        catch(exception) {
            throw new BadRequestException(exception.message)
        }
    }

    @Post()
    async create(@Body() myvendor: MyvendorAddDTO): Promise<Myvendor> {
        try {
            myvendor.status = '1';
            return await this.myvendorService.create(myvendor);
        }
        catch(exception) {
            throw new BadRequestException(exception.message)
        }
    }

    @Put()
    async update(@Body() myvendor: MyvendorEditDTO): Promise<Myvendor> {
        try {
            return await this.myvendorService.update(myvendor);
        }
        catch(exception) {
            throw new BadRequestException(exception.message)
        }
    }

    @Delete()
    async delete(@Body() myvendor: MyvendorDeleteDTO): Promise<{}> {

        myvendor.isDeleted = true;
        myvendor.deletedAt = new Date;
        try {
            return await this.myvendorService.delete(myvendor);
        }
        catch(exception) {
            throw new BadRequestException(exception.message)
        }
    }

    @Post('/myvendorRequest')
    async MyvendorRequest(@Body() myvendor: MyvendorAddDTO) {
        myvendor.status = '0';
        return await this.myvendorService.create(myvendor);
    }

    @Get('/myvendorRequest/:company_id')
    async MyvendorRequestGetAll(@Param('company_id') company_id: string): Promise<Myvendor[]>  {
        return await this.myvendorService.getRequestbyVendor(company_id);
    }
   
}
