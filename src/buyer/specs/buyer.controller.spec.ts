import { Test, TestingModule } from '@nestjs/testing';
import { BuyerController } from '../buyer.controller';
import { BuyerService } from '../buyer.service';
import { getModelToken } from '@nestjs/mongoose';
import { BuyerRepository } from '../repository/buyer.repository';
import { BuyerHelper } from '../helper/buyer.helper';

 const companyDetail = {
  "company_code":"TES01",
  "type":"",
  "category":"",
  "legal_name":"PT. TESTING",
  "name":"",
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
  "category":"",
  "legal_name":"",
  "name":"",
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
  find: jest.fn((data) => ({
    skip: jest.fn().mockReturnThis(),
    limit:jest.fn(() => {
      return companyDetail;
      
    }),
  })),
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


describe('Company Controller', () => {
  let controller: BuyerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerRepository, BuyerHelper, BuyerService, {
        provide: getModelToken('Buyer'),
        useValue: RepositoryMock,
      }],
      controllers: [BuyerController],
    }).compile();

    controller = module.get<BuyerController>(BuyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  
});
