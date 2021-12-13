import { Test, TestingModule } from '@nestjs/testing';
import { BuyerService } from '../buyer.service';
import { getModelToken } from '@nestjs/mongoose';
import { BuyerRepository } from '../repository/buyer.repository';
import { BuyerHelper } from '../helper/buyer.helper';

const RepositoryMock = {
};

describe('Company Service', () => {
  let service: BuyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerRepository, BuyerHelper, BuyerService, {
        provide: getModelToken('Buyer'),
        useValue: RepositoryMock,
      }],
    }).compile();

    service = module.get<BuyerService>(BuyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
