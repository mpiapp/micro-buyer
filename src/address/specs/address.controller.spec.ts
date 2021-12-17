import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { getModelToken } from '@nestjs/mongoose';
import { AddressService } from '../address.service';
import { AddressRepository } from '../respository/address.repository';

const address = {
    buyer_id: '1',
    address: 'alamat',
    phone: '0811111',
    longitude: '0.1',
    latitude: '0.2'
}

const RepositoryMock = {
  create: (dto) => {
    return dto; 
  },
  findByIdAndUpdate : (id, dto) => {
    return dto;
  }
}


describe('AddressController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressRepository, AddressService, {
        provide: getModelToken('Address'),
        useValue: RepositoryMock
      }],
      controllers: [AddressController],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add address', async () => {
    expect(await controller.create(address)).toBe(undefined);
  });

  it('should edit address', async () => {
    expect(await controller.update('1', address)).toBe(address);
  });

  it('should delete address', async () => {
    const deleted = await controller.delete('1')
    expect(deleted.isDeleted).toBe(true);
  });
});
