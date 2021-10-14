import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../company.service';
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

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRepository, CompanyHelper, CompanyService, {
        provide: getModelToken('Company'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
