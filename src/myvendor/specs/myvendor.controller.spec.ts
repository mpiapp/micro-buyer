import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MyvendorController } from '../myvendor.controller';
import { MyvendorService } from '../myvendor.service';
import { MyvendorRepository } from '../repository/myvendor.repository';

const goodData = {
  "company_id": "1",
  "vendor_id": "1",
  "payment_term": "COD",
  "initial_discount": 10,
  "status": "1",
  "product": [
    {"product_id":1, "discount":10, "payment_term":null},
    {"product_id":2, "discount":2, "payment_term":3}
  ]
}

const badData = {
  "company_id": "0",
  "vendor_id": "1",
  "status": "1",
  "payment_term": "COD",
  "initial_discount": 10,
  "product": [
    {"product_id":1, "discount":10, "payment_term":null},
    {"product_id":2, "discount":2, "payment_term":3}
  ]
}

const deletedData = {
  "company_id": "1",
  "vendor_id": "1",
  "isDeleted": true,
  "deletedAt": new Date
}

const deletedDataFail = {
  "company_id": "0",
  "vendor_id": "1",
  "isDeleted": true,
  "deletedAt": new Date
}

const RepositoryMock = {
  create: (dto) => {
    if(dto.company_id !== '1') {
      throw new Error('Error');
    }

    return dto; 
  },
  find: (id) => {
    if(id.company_id === 'INVALID') {
      throw new Error('Error');
    }

    return goodData;
  },
  findOne:  jest.fn((dto) => ({ 
    select: jest.fn(() => {
      if(dto.company_id === 'INVALID') {
        throw new Error('Error');
      }

      if(dto.company_id === 'INVALID2') {
        return null;
      }

      return dto;
    }),
    skip: jest.fn().mockReturnThis(),
    countDocuments:jest.fn(() => {
      if(dto.company_id === '1') {
        return 0;
      }

      throw new Error('Error');
    }) 
  })),
  findOneAndUpdate : (id, data) => {
    if(data.company_id === '1') {
      return data;
    }
  }
}

describe('MyvendorController', () => {
  let controller: MyvendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyvendorRepository, MyvendorService, {
        provide: getModelToken('Myvendor'),
        useValue: RepositoryMock
      }],
      controllers: [MyvendorController],
    }).compile();

    controller = module.get<MyvendorController>(MyvendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add new vendor into vendor list', async () => {
    expect(await controller.create(goodData)).toBe(goodData);
  });


  it('should fail when add new vendor into vendor list', () => {
    expect(controller.create(badData)).rejects.toThrow('Error');
  });

  it('should edit new vendor', async () => {
    expect(await controller.update(goodData)).toBe(goodData);
  });

  it('should fail edit new vendor', () => {
    expect(controller.update(badData)).rejects.toThrow('Document not exists');
  });

  it('should delete a buyer', async () => {
    expect(await controller.delete(deletedData)).toStrictEqual({"message": "Success. Document has been deleted", "statusCode": 200});
  });

  it('should fail delete non exists buyer', () => {
    expect(controller.delete(deletedDataFail)).rejects.toThrow('Document not exists');
  });

  it('should get all buyer from my vendor list',async () => {
    expect(await controller.getAll()).toBe(goodData);
  });


  it('should get single buyer from my vendor list',async () => {
    const buyer = await controller.getbyBuyer('1','1');
    expect(buyer.company_id).toBe('1');
  });

  it('should failed get none existing buyer from my vendor list', () => {
    expect(controller.getbyBuyer('INVALID','INVALID')).rejects.toThrow('Error');
  });

  it('should failed get none existing buyer from my vendor list', () => {
    expect(controller.getbyBuyer('INVALID2','INVALID2')).rejects.toThrow('Document not exists');
  });

  it('should get prefered buyer by vendor id',async () => {
    expect(await controller.getbyVendor('1')).toBe(goodData);
  });

  it('should failed get prefered buyer by vendor id', () => {
    expect(controller.getbyVendor('INVALID')).rejects.toThrow('Error');
  });

  it('should create request  new vendor into vendor list', async () => {
    expect(await controller.MyvendorRequest(goodData)).toBe(goodData);
  });

  it('should get requested  buyer by vendor id',async () => {
    expect(await controller.MyvendorRequestGetAll('1')).toBe(goodData);
  });

});