import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../user.service';

const goodData = {
  "auth_id": "1",
  "company_id": "string",
  "email": "string",
  "role_id": "string",
  "username": "string",
  "fullname": "string",
  "password": "string"
}

const RepositoryMock = {
  create: (dto) => {
    return dto;
  },
  findOne: (id) => {
    if(id.auth_id != '1') {
      return false;
    }

    return true;
  },
  findOneAndUpdate: (id, dto) => {
    if(id.auth_id != '1') {
      throw new NotFoundException('Error');
    }

    return dto;
  },
  find: (id) => {

    if(id.company_id === '1') {
      return goodData;
    }
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, UserService, {
        provide: getModelToken('User'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add user', async () => {
    expect(await service.createUser(goodData)).toMatchObject(goodData);
  });

  it('should edit user', async () => {
    expect(await service.editUser('1', goodData)).toBe(goodData);
  });

  it('should failed edit user', () => {
    expect(service.editUser('2', goodData)).rejects.toThrow('Error');
  });

  it('should get all user', async () => {
    expect(await service.getUser('1')).toBe(goodData);
  })

  it('should get detail user in company', async() => {
    expect(await service.getUserDetail('1','1')).toBe(true);
  })
});
