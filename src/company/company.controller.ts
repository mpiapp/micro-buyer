import { Body, Controller, BadRequestException, Param, Post, Put, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { companyDetailAddDTO } from './dto/company.detail.add.dto';
import { companyDetailEditDTO } from './dto/company.detail.edit.dto';
import { Company } from './schema/company.schema';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Company Module')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}
  
    @Get()
    async getAllCompany(): Promise<Company[]> {
		  return await this.companyService.getAllCompany();
	  }

    @Get('/:id')
    async getCompanyDetail(@Param('id') id: string): Promise<Company> {
      try {
        return await this.companyService.getCompanyDetail(id);
      }
      catch(exception) {
        throw new BadRequestException([exception.message])
      }
	  }

    @Post()
    async addCompanyDetail(@Body() companyDetailAdd: companyDetailAddDTO): Promise<Company> {
      try {
        return await this.companyService.addCompanyDetail(companyDetailAdd);
      }
		  catch(exception) {
        throw new BadRequestException([exception.message]); 
      }
	  }
    
    @Put('/:id')
	  async editCompanyDetail(@Param('id') id: string, @Body() companyDetailEdit: companyDetailEditDTO): Promise<Company> {
      try {
        return await this.companyService.editCompanyDetail(id, companyDetailEdit);
      }
      catch(exception) {
        throw new BadRequestException([exception.message]); 
      }
	  }
}