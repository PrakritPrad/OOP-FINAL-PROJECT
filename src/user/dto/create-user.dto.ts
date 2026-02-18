import { UserRole, UserStatus } from '../entities/user.entity';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsString()
  organizationId!: string;

  @IsString()
  department!: string;

  @IsString()
  position!: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}