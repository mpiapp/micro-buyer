import { Test, TestingModule } from '@nestjs/testing';
import { MyvendorController } from './myvendor.controller';

describe('MyvendorController', () => {
  let controller: MyvendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyvendorController],
    }).compile();

    controller = module.get<MyvendorController>(MyvendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
