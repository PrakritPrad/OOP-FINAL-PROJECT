import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LowdbModule } from '../../common/database/lowdb.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [LowdbModule, OrganizationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
