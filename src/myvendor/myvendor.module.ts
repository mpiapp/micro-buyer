import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyvendorService } from './myvendor.service';
import { MyvendorRepository } from './repository/myvendor.repository';
import { Myvendor, MyvendorSchema } from './schema/myvendor.schema';
import { MyvendorController } from './myvendor.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Myvendor.name, schema: MyvendorSchema } ]),
  ],
  providers: [MyvendorRepository, MyvendorService],
  controllers: [MyvendorController]
})
export class MyvendorModule {}
