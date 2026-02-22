import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationType, OrganizationStatus } from '../entities/organization.entity';
import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Acme Corporation' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'TH-1234567' })
  @IsString()
  registrationNumber!: string;

  @ApiProperty({ example: 'A leading technology company.' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  industry!: string;

  @ApiProperty({ enum: OrganizationType, example: OrganizationType.CORPORATE })
  @IsEnum(OrganizationType)
  type!: OrganizationType;

  @ApiPropertyOptional({ enum: OrganizationStatus, example: OrganizationStatus.ACTIVE })
  @IsOptional()
  @IsEnum(OrganizationStatus)
  status?: OrganizationStatus;

  @ApiProperty({ example: 'https://acme.com' })
  @IsUrl()
  website!: string;

  @ApiProperty({ example: 'contact@acme.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+66212345678' })
  @IsString()
  phone!: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  address!: string;

  @ApiProperty({ example: 'Bangkok' })
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Thailand' })
  @IsString()
  country!: string;

  @ApiProperty({ example: '2010-06-01' })
  @IsString()
  foundedDate!: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  numberOfEmployees!: number;

  @ApiPropertyOptional({ example: 'https://cdn.acme.com/logo.png' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ example: 'TAX-0000000000' })
  @IsString()
  taxId!: string;
}
