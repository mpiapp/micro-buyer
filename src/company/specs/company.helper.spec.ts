import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHelper } from '../helper/company.helper';
import { CompanyRepository } from '../repository/company.repository';

const RepositoryMock = {
  create: (dto) => {
    return dto; 
  },
  findByIdAndUpdate : (id, dto) => {
    return dto;
  }
}

describe('CompanyHelper', () => {
  let helper: CompanyHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRepository, CompanyHelper, {
        provide: getModelToken('Company'),
        useValue: RepositoryMock
      }],
    }).compile();

    helper = module.get<CompanyHelper>(CompanyHelper);
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
  });
});
