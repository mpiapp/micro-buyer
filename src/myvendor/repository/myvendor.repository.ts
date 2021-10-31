import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MyvendorAddDTO } from "../dto/myvendor.add.dto";
import { MyvendorDeleteDTO } from "../dto/myvendor.delete.dto";
import { MyvendorEditDTO } from "../dto/myvendor.edit.dto";
import { Myvendor, MyvendorDocument } from "../schema/myvendor.schema";

@Injectable()
export class MyvendorRepository {
    constructor(@InjectModel(Myvendor.name) private MyvendorModel: Model<MyvendorDocument>) {}

    async getAll(): Promise<Myvendor[]> {
        return await this.MyvendorModel.find({isDeleted: { "$ne": true }});
    }

    async getbyVendor(company_id: string): Promise<Myvendor[]> {
        const doc = await this.MyvendorModel.find({company_id: company_id, isDeleted: { "$ne": true }});
        return doc;
    }

    async getRequestbyVendor(company_id: string): Promise<Myvendor[]> {
        const doc = await this.MyvendorModel.find({company_id: company_id, status:'0', isDeleted: { "$ne": true }});
        return doc;
    }

    async getbyBuyer(company_id: string, vendor_id: string): Promise<Myvendor> {
        const doc = await this.MyvendorModel.findOne({company_id: company_id, vendor_id: vendor_id, isDeleted: { "$ne": true }}).select({});
        if(!doc?.company_id) {
            throw new BadRequestException('Document not exists');
        }
        return doc;
    }

    async countBy(param: {}): Promise<number> {
        return this.MyvendorModel.findOne(param).countDocuments();
    }
    
    async create(Myvendor: MyvendorAddDTO): Promise<Myvendor> {
        if(await this.countBy({ company_id: Myvendor.company_id, vendor_id: Myvendor.vendor_id , isDeleted: { "$ne": true }}) !== 0) {
            throw new BadRequestException('Duplicate entity');
        }
        return await this.MyvendorModel.create(Myvendor);
    }

    async update(Myvendor: MyvendorEditDTO): Promise<Myvendor> {
        const docs =  await this.MyvendorModel.findOneAndUpdate({ company_id : Myvendor.company_id, vendor_id: Myvendor.vendor_id, isDeleted: { "$ne": true } }, Myvendor, {new:true});
        if(!docs?.company_id) {
            throw new BadRequestException('Document not exists');
        }
        return docs;
    }

    async delete(Myvendor: MyvendorDeleteDTO) {
        const docs =  await this.MyvendorModel.findOneAndUpdate({ company_id : Myvendor.company_id, vendor_id: Myvendor.vendor_id, isDeleted: { "$ne": true } }, Myvendor);
        if(!docs?.company_id) {
            throw new BadRequestException('Document not exists');
        }

        return {
            "statusCode": 200,
            "message": "Success. Document has been deleted",
          }
    }
}