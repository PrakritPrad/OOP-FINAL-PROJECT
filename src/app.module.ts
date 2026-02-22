import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [UserModule, OrganizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
