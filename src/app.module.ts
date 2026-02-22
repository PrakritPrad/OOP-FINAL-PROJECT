import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, OrganizationModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
