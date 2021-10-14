import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { companyDetailAddDTO } from '../dto/company.detail.add.dto';
import { companyDetailEditDTO } from '../dto/company.detail.edit.dto';
import { Company, CompanyDocument } from '../schema/company.schema';

@Injectable()
export class CompanyRepository {

    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

    async create(companyDetail: companyDetailAddDTO): Promise<Company> {
        return await this.companyModel.create(companyDetail);
    }

    async update(id: string, companyDetail: companyDetailEditDTO): Promise<Company> {
        return await this.companyModel.findOneAndUpdate({ _id: id }, companyDetail, { new: true , useFindAndModify: false})
    }

    async getOne(id: string): Promise<Company> {
        return await this.companyModel.findById({ _id: id });
    }

    async getAll(): Promise<Company[]> {
        return await this.companyModel.find();
    }

    async getSimilarCompanyCode(keyword: string) {
        return await this.companyModel
                    .findOne({company_code: {$regex: keyword, $options: 'i'} })
                    .select('company_code')
                    .sort({$natural:-1})
                    .limit(1);
    }
    
}