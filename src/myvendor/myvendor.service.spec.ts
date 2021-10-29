import { Test, TestingModule } from '@nestjs/testing';
import { MyvendorService } from './myvendor.service';

describe('MyvendorService', () => {
  let service: MyvendorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyvendorService],
    }).compile();

    service = module.get<MyvendorService>(MyvendorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
