import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleRepository } from '../repository/role.repository';
import { RoleController } from '../role.controller';
import { RoleService } from '../role.service';

const goodData = {
  "code":"my-role",
  "name": "my role",
  "permission": [
    {
      "feature": "product",
      "capability": {"read":true,"write":true,"delete":true,"print":false},
    },
    {
      "feature": "pr",
      "capability": {"read":true,"write":true,"delete":true,"print":false},
    }
  ]
}

const badData = {
  "code":"my-role",
  "name": "TEST-ERROR",
  "permission": [
    {
      "feature": "product",
      "capability": {"read":true,"write":true,"delete":true,"print":false},
    },
    {
      "feature": "pr",
      "capability": {"read":true,"write":true,"delete":true,"print":false},
    }
  ]
}

const RepositoryMock = {
  create: (dto) => {
    if(dto.name == 'TEST-ERROR') {
      throw new Error("Bad Request Exception");
    }
    return dto;
  },
  findByIdAndUpdate : (id, dto) => {
    if(id._id !== '1') {
      throw new Error("Bad Request Exception");
    }
    
    return dto;
  },
  find: () => {
    return goodData;
  },
  findById: (id) => {
    if(id._id !== '1') {
      throw new Error("Bad Request Exception");
    }
    
    return goodData;
  }
}

describe('RoleController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleRepository, RoleService, {
        provide: getModelToken('Role'),
        useValue:RepositoryMock,
      }],
      controllers: [RoleController],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add new role', async () => {
    expect(await controller.createRole(goodData)).toBe(goodData);
  })

  it('should fail when add new role', () => {
    expect(controller.createRole(badData)).rejects.toThrow('Bad Request Exception');
  })

  it('should edit a role', async () => {
    expect(await controller.editRole('1', goodData)).toBe(goodData);
  })

  it('should fail edit', () => {
    expect(controller.editRole('2', badData)).rejects.toThrow('Bad Request Exception');
  });

  it('should get role detail by _id', async () => {
    expect(await controller.getRole('1')).toBe(goodData);
  });

  it('should thrown an error while get non existing role _id', () => {
    expect(controller.getRole('TEST')).rejects.toThrow('Bad Request Exception');
  });

  it('should get all role', async () => {
    expect(await controller.getAllRole()).toBe(goodData);
  });
});
