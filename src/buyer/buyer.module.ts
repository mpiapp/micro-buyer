import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerService } from './buyer.service';
import { Buyer, BuyerSchema } from './schema/buyer.schema';
import { BuyerController } from './buyer.controller';
import { BuyerRepository } from './repository/buyer.repository';
import { BuyerHelper } from './helper/buyer.helper';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Buyer.name, schema: BuyerSchema } ]),
  ],
  providers: [
    BuyerService, 
    BuyerRepository, 
    BuyerHelper
  ],
  controllers: [BuyerController]
}) 
export class BuyerModule {}
