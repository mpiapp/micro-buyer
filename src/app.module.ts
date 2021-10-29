import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { MyvendorModule } from './myvendor/myvendor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_SRV),
    CompanyModule,
    RoleModule,
    UserModule,
    AddressModule,
    MyvendorModule,
  ]
})
export class AppModule {}
