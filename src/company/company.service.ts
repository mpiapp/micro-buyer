import { Injectable } from '@nestjs/common';
import { companyDetailAddDTO } from './dto/company.detail.add.dto';
import { companyDetailEditDTO } from './dto/company.detail.edit.dto';
import { Company } from './schema/company.schema';
import { CompanyRepository } from './repository/company.repository';
import { CompanyHelper } from './helper/company.helper';

@Injectable()
export class CompanyService {
    constructor(private companyRepository: CompanyRepository, private helper: CompanyHelper) {}

    async addCompanyDetail(companyDetail: companyDetailAddDTO): Promise<Company> {
        const companyCode = await this.helper.generateCompanyCode(companyDetail.legal_name);
        
        companyDetail.company_code = companyCode;

        return this.companyRepository.create(companyDetail);
    }

    async editCompanyDetail(id: string, companyDetail:  companyDetailEditDTO): Promise<Company> {
        return this.companyRepository.update(id, companyDetail)
    }
    
    async getCompanyDetail(id: string): Promise<Company> {
        return this.companyRepository.getOne(id)
    }
    
    async getAllCompany(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    
}

