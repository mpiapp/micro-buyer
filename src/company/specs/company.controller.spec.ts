import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '../company.controller';
import { CompanyService } from '../company.service';
import { CompanyHelper } from '../helper/company.helper';
import { CompanyRepository } from '../repository/company.repository';

const companyDetail = {
  "company_code":"TES01",
  "type":"",
  "category":0,
  "legal_name":"PT. TESTING",
  "alias_name":"",
  "address": "",
  "longitude":"",
  "latitude":"",
  "phone":"",
  "whatsapp":"",
  "email":"",
  "website":"",
  "instagram":"",
  "facebook":"",
  "twitter":"",
  "_id":"1"
}

const companyDetailErr = {
  "company_code":"TES02",
  "type":"",
  "category":0,
  "legal_name":"",
  "alias_name":"",
  "address": "",
  "longitude":"",
  "latitude":"",
  "phone":"",
  "whatsapp":"",
  "email":"",
  "website":"",
  "instagram":"",
  "facebook":"",
  "twitter":"",
  "notInSchema":"",
  "_id":"1"
}

const RepositoryMock = {
  create: (dto) => {
    if(JSON.stringify(dto) !== JSON.stringify(companyDetail)) {
      throw new Error('Test Error');
    }
    return dto;
  },
  find: () => {
    return companyDetail;
  },
  findById: ({ _id: id }) => {
    if(companyDetail._id !== id) {
      throw new Error('Test Error');
    }

    return companyDetail;
  },
  findOne: jest.fn((data) => ({
    sort: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    limit:jest.fn(() => {
      if(data.company_code.$regex === companyDetail.company_code.substr(0,3)) {
        return companyDetail;
      }
      return null;
    }),
})),
  findOneAndUpdate: ({ _id: id }, companyDetailEditDTO) => {
    if(companyDetail._id !== id) {
      throw new Error('Test Error');
    }
    
    return companyDetailEditDTO;
  },
};

export { RepositoryMock }

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRepository, CompanyHelper, CompanyService, {
        provide: getModelToken('Company'),
        useValue: RepositoryMock
      }],
      controllers: [CompanyController],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add company detail', async () => {
    expect(await controller.addCompanyDetail(companyDetail)).toMatchObject(companyDetail);
  });

  it('should edit company detail', async () => {
    expect(await controller.editCompanyDetail('1',companyDetail)).toMatchObject(companyDetail);
  });
  
  it('should get company detail', async () => {
    expect(await controller.getCompanyDetail('1')).toMatchObject(companyDetail);
  });

  it('should get all company', async () => {
    expect(await controller.getAllCompany()).toMatchObject(companyDetail);
  });

  it('should throw an error when get not exists company', () => {
    expect(controller.getCompanyDetail('NON-EXISTING-ID')).rejects.toThrow('Bad Request Exception');
  });

  it('should throw an error when add company detail', () => {
    expect(controller.addCompanyDetail(companyDetailErr)).rejects.toThrow('Bad Request Exception');
  });

  it('should throw an error when edit company detail', () => {
    expect(controller.editCompanyDetail('NON-EXISTING-ID',companyDetail)).rejects.toThrow('Bad Request Exception');
  });
});
