import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { buyerDetailAddDTO } from '../dto/buyer.detail.add.dto';
import { buyerDetailEditDTO } from '../dto/buyer.detail.edit.dto';
import { buyerRegisterDTO } from '../dto/buyer.register.dto';
import { Buyer, BuyerDocument } from '../schema/buyer.schema';

@Injectable()
export class BuyerRepository {

    constructor(@InjectModel(Buyer.name) private buyerModel: Model<BuyerDocument>) {}

    async register(buyerData: any): Promise<Buyer> {
      
        return await this.buyerModel.create(buyerData);
    }

    async getAll(): Promise<Buyer[]> {
        return await this.buyerModel.find();
    }

    async create(buyerDetail: buyerDetailAddDTO): Promise<Buyer> {
        return await this.buyerModel.create(buyerDetail);
    }

    async update(buyerDetail: any): Promise<Buyer> {
        return await this.buyerModel.findOneAndUpdate({ _id: buyerDetail._id }, buyerDetail, { new: true , useFindAndModify: false})
    }

    async getOne(id: string): Promise<Buyer> {
        return await this.buyerModel.findById({ _id: id });
    }

    

    async getPerPage(page: number, limit: number): Promise<Buyer[]> {
        return await this.buyerModel
                    .find()
                    .skip(Number(page) * Number(limit))
                    .limit(Number(limit));
    }

    async getSimilarCompanyCode(keyword: string) {
        return await this.buyerModel
                    .findOne({company_code: {$regex: keyword, $options: 'i'} })
                    .select('company_code')
                    .sort({$natural:-1})
                    .limit(1);
    }
    
}