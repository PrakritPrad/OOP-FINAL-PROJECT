import { OrganizationType, OrganizationStatus } from '../entities/organization.entity';
import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name!: string;

  @IsString()
  registrationNumber!: string;

  @IsString()
  description!: string;

  @IsString()
  industry!: string;

  @IsEnum(OrganizationType)
  type!: OrganizationType;

  @IsOptional()
  @IsEnum(OrganizationStatus)
  status?: OrganizationStatus;

  @IsUrl()
  website!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;

  @IsString()
  foundedDate!: string;

  @IsNumber()
  numberOfEmployees!: number;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsString()
  taxId!: string;
}
