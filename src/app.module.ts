import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SkibidiModule } from './skibidi/skibidi.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, OrganizationModule, SkibidiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
