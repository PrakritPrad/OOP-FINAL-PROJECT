import { BaseEntity } from '../../../common/interfaces/base-entity';

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
}

export enum OrganizationType {
  CORPORATE = 'CORPORATE',
  NGO = 'NGO',
  STARTUP = 'STARTUP',
  GOVERNMENT = 'GOVERNMENT',
  EDUCATION = 'EDUCATION',
  HEALTHCARE = 'HEALTHCARE',
}

export class Organization extends BaseEntity {
  name!: string;
  registrationNumber!: string;
  description!: string;
  industry!: string;
  type!: OrganizationType;
  status!: OrganizationStatus;
  website!: string;
  email!: string;
  phone!: string;
  address!: string;
  city!: string;
  country!: string;
  foundedDate!: string;
  numberOfEmployees!: number;
  logo?: string;
  taxId!: string;
}
