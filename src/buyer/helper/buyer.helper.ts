import { Injectable } from "@nestjs/common";
import { BuyerRepository } from "../repository/buyer.repository";

@Injectable()
export class BuyerHelper {
    constructor(private buyerRepository: BuyerRepository) {}

    createAbbr(companyName: string) {
        return companyName.replace(/[^A-Za-z]/g, '')
                .replace(/PT|CV|MV|UD/g, '')
                .substring(0, 3)
                .toUpperCase();
    }

    async generateCompanyCode(companyName: string): Promise<string> {
        const companyAbbr = this.createAbbr(companyName);
        const similarAbbrObj = await this.buyerRepository.getSimilarCompanyCode(companyAbbr);
        const similarAbbr    = similarAbbrObj?.company_code || null;
        const lastID = parseInt(similarAbbr?.substr(-2)) || 0;
        const incID = ('0' + (lastID + 1)).slice(-2);
        
        return companyAbbr + incID;
    }
}