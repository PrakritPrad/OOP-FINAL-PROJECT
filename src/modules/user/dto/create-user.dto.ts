import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';
import { IsString, IsEmail, IsEnum, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'secret1234' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+66812345678' })
  @IsString()
  phone!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.STAFF })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiProperty({ example: 'org-001' })
  @IsString()
  organizationId!: string;

  @ApiProperty({ example: 'Engineering' })
  @IsString()
  department!: string;

  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  position!: string;

  @ApiPropertyOptional({ example: 'A passionate developer.' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @ApiProperty({ example: 'Asia/Bangkok' })
  @IsString()
  timezone!: string;

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00Z' })
  @IsOptional()
  @IsString()
  lastLoginAt?: string;

  @ApiPropertyOptional({ enum: UserStatus, example: UserStatus.ACTIVE })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}