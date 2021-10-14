import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleRepository } from '../repository/role.repository';
import { RoleService } from '../role.service';

const roleMock = {
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
    },
    {
      "feature": "order",
      "capability": {"read":true,"write":true,"delete":true,"print":false},
    },
  ]
}

const RepositoryMock = {
  create: (dto) => {
    return dto;
  },
  findByIdAndUpdate : (id, dto) => {
    if(id._id === '1') {
      return dto;
    }
    
    return 'error';
  }
}

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        RoleService, {
          provide: getModelToken('Role'),
          useValue: RepositoryMock,
        }
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should crete new custom role', async () => {
    expect(await service.createRole(roleMock)).toMatchObject(roleMock)
  });

  it('should edit custom role', async() => {
    expect(await service.editRole('1', roleMock)).toBe(roleMock)
  })
});