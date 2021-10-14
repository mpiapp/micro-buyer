import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from './repository/role.repository';
import { Role, RoleSchema } from './schema/role.schema';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema } ]),
    ],
    providers: [
      RoleRepository,
      RoleService
    ],
    controllers: [RoleController]
  })
export class RoleModule {}
