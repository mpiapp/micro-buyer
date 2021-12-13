import { Body, Controller, BadRequestException, Param, Post, Put, Get, HttpStatus } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { buyerRegisterDTO } from './dto/buyer.register.dto';
import { buyerDetailAddDTO } from './dto/buyer.detail.add.dto';
import { buyerDetailEditDTO } from './dto/buyer.detail.edit.dto';
import { Buyer } from './schema/buyer.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('buyer')
export class BuyerController {
    constructor(private readonly buyerService: BuyerService) {}
  
    @MessagePattern('buyer.register')
    async registerBuyer(@Payload() payload: any): Promise<any>{

      let buyerData: any = { 
        name: payload.value.company_name
      };

      try {
        let data =  await this.buyerService.registerBuyer(buyerData);
        
        return {
          status: HttpStatus.OK,
          message: "Success register buyer",
          data: data,
          errors: null
        }
      }
      catch(error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: null,
          errors: error
        };
      }
    } 


    @MessagePattern('buyer.detail')
	  async addBuyerDetail(@Payload() payload: any): Promise<any> {
      
      try {
        let buyerDetail =  await this.buyerService.AddCompanyDetail(payload.value);
      
        return {
          status: HttpStatus.OK,
          message: "Success add company detail",
          data: buyerDetail,
          errors: null
        };
      }
      catch(error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: null,
          errors: error
        };
      }
     
	  }


    @MessagePattern('buyer.legaldoc')
	  async addBuyerDocs(@Payload() payload: any): Promise<any> {

      try {
        let legalDocs = await this.buyerService.AddLegalDocs(payload.value);

        return {
          status: HttpStatus.OK,
          message: "Success update legal docs",
          data: legalDocs,
          errors: null
        };
      }
      catch(error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: null,
          errors: error
        };
      }


	  }

    @MessagePattern('buyer.get.all')
    async getAllBuyer(@Payload() payload: any): Promise<Buyer[]> {
		  return await this.buyerService.getAllBuyer(payload.value.page, payload.value.limit);
	  }

    @MessagePattern('buyer.get.detail')
    async getCompanyDetail(@Payload() payload: any): Promise<any> {
      try {
        let buyerDetail = await this.buyerService.getCompanyDetail(payload.value._id);

        return {
          status: HttpStatus.OK,
          message: "success get vendor",
          data: buyerDetail,
          errors: null
        }
      }
      catch(error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: null,
          errors: error
        };
      }
      
      
	  }

    @Post()
    async addCompanyDetail(@Body() companyDetailAdd: buyerDetailAddDTO): Promise<Buyer> {
      try {
        return await this.buyerService.addBuyerDetail(companyDetailAdd);
      }
		  catch(exception) {
        throw new BadRequestException([exception.message]); 
      }
	  }
}