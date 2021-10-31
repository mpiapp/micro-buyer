import { Injectable } from '@nestjs/common';
import { MyvendorAddDTO } from './dto/myvendor.add.dto';
import { MyvendorDeleteDTO } from './dto/myvendor.delete.dto';
import { MyvendorEditDTO } from './dto/myvendor.edit.dto';
import { MyvendorRepository } from './repository/myvendor.repository';
import { Myvendor } from './schema/myvendor.schema';

@Injectable()
export class MyvendorService {
    constructor(private MyvendorRepository: MyvendorRepository) {}

    async getAll(): Promise<Myvendor[]> {
        return await this.MyvendorRepository.getAll();
    }

    async getbyVendor(company_id: string): Promise<Myvendor[]> {
        return await this.MyvendorRepository.getbyVendor(company_id);
    }

    async getRequestbyVendor(company_id: string): Promise<Myvendor[]> {
        return await this.MyvendorRepository.getRequestbyVendor(company_id);
    }

    async getbyBuyer(company_id: string, buyer_id: string): Promise<Myvendor> {
        return await this.MyvendorRepository.getbyBuyer(company_id, buyer_id);
    }

    async create(Myvendor: MyvendorAddDTO): Promise<Myvendor> {
        return await this.MyvendorRepository.create(Myvendor);
    }

    async update(Myvendor: MyvendorEditDTO): Promise<Myvendor> {
        return await this.MyvendorRepository.update(Myvendor);
    }

    async delete(Myvendor: MyvendorDeleteDTO): Promise<{}> {
        return await this.MyvendorRepository.delete(Myvendor);
    }
}
