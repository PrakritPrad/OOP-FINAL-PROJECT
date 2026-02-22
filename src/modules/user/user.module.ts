import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LowdbModule } from '../../common/database/lowdb.module';

@Module({
  imports: [LowdbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
