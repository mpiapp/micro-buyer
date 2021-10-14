import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repository/user.repository';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

const goodData = {
  "auth_id": "1",
  "company_id": "123",
  "email": "string",
  "role_id": "string",
  "username": "string",
  "fullname": "string",
  "password": "string"
}

const badData = {
  "auth_id": "2",
  "company_id": "345",
  "email": "string",
  "role_id": "string",
  "username": "string",
  "fullname": "string",
  "password": "string"
}

const RepositoryMock = {
  create: (dto) => {
    if(dto.company_id != '123') {
      throw new Error('Error');
    }

    return dto;
  },
  findOne: (id) => {
    if(id.auth_id != '1') {
      throw new Error('Error');
    }

    return goodData;
  },
  findOneAndUpdate: (id, dto) => {
    if(id.auth_id != '1') {
      throw new Error('Error');
    }

    return dto;
  },
  find: (id) => {

    if(id.company_id !== '1') {
      throw new Error('Error');
    }

    return goodData;
  }
}

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        UserService,
        {
          provide: getModelToken('User'),
          useValue: RepositoryMock,
        }],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add new user', async () => {
    expect(await controller.createUser(goodData)).toBe(goodData);
  });

  it('should fail add new user', () => {
    expect(controller.createUser(badData)).rejects.toThrow('Error');
  });

  it('should  edit user', async () => {
    expect(await controller.editUser('1',goodData)).toBe(goodData);
  });

  it('should fail edit user', () => {
    expect(controller.editUser('2',goodData)).rejects.toThrow('Error');
  });

  it('should get all user', async () => {
    expect(await controller.getUser('1')).toBe(goodData);
  })

  it('should throw error get user from non existing company', () => {
    expect(controller.getUser('2')).rejects.toThrow('Error');
  })

  it('should get detail user in company', async () => {
    expect(await controller.getUserDetail('1','1')).toBe(goodData);
  })
});
