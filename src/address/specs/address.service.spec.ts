import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { AddressRepository } from '../respository/address.repository';

const RepositoryMock = {
  create: (dto) => {
    return dto; 
  },
  findByIdAndUpdate : (id, dto) => {
    return dto;
  }
}

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressRepository, AddressService, {
        provide: getModelToken('Address'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
