import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressRepository } from './respository/address.repository';
import { Address, AddressSchema } from './schema/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema } ]),
  ],
  providers: [AddressRepository, AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
