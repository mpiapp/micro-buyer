import { Injectable } from '@nestjs/common';
import { buyerDetailAddDTO } from './dto/buyer.detail.add.dto';
import { buyerDetailEditDTO } from './dto/buyer.detail.edit.dto';
import { Buyer } from './schema/buyer.schema';
import { BuyerRepository } from './repository/buyer.repository';
import { BuyerHelper } from './helper/buyer.helper';
import { buyerRegisterDTO } from './dto/buyer.register.dto';

@Injectable()
export class BuyerService {
    constructor(private buyerRepository: BuyerRepository, private helper: BuyerHelper) {}

    async addBuyerDetail(companyDetail: buyerDetailAddDTO): Promise<Buyer> {
       // const companyCode = await this.helper.generateCompanyCode(companyDetail.legal_name);
       // companyDetail.company_code = companyCode;

        return this.buyerRepository.create(companyDetail);
    }

    async AddCompanyDetail(companyDetail:  buyerDetailEditDTO): Promise<Buyer> {
       // if(companyDetail.legal_name) {
       //     const companyCode = await this.helper.generateCompanyCode(companyDetail.legal_name);
       //     companyDetail.company_code = companyCode;
       //     
       // }
        return this.buyerRepository.update(companyDetail)
    }

    async AddLegalDocs(legalDocs:  any): Promise<Buyer> {
        
        return this.buyerRepository.update(legalDocs)
    }

    async getCompanyDetail(id: string): Promise<Buyer> {
        return this.buyerRepository.getOne(id)
    }

    async registerBuyer(buyerData: buyerRegisterDTO): Promise<Buyer> {
        const companyCode = await this.helper.generateCompanyCode(buyerData.name);
        buyerData.company_code = companyCode;
        return await this.buyerRepository.register(buyerData);
    }

    async getAllBuyer(page, limit): Promise<Buyer[]> {
        if(page != undefined) {
            return this.buyerRepository.getPerPage(page - 1, limit);
        }
        return this.buyerRepository.getAll();
    }
}
