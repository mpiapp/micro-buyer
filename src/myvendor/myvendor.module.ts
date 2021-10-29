import { Module } from '@nestjs/common';
import { MyvendorService } from './myvendor.service';
import { MyvendorController } from './myvendor.controller';

@Module({
  providers: [MyvendorService],
  controllers: [MyvendorController]
})
export class MyvendorModule {}
