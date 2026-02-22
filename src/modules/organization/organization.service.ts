import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization, OrganizationStatus } from './entities/organization.entity';
import { LowdbService } from '../../common/database/lowdb.service';
import { generateId } from '../../common/utils/id-generator';
import { now } from '../../common/utils/date-utils';

@Injectable()
export class OrganizationService {
  constructor(private readonly lowdb: LowdbService) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organizations = await this.lowdb.getAll('organizations');

    const regNumExists = organizations.some(
      (org) => org.registrationNumber === createOrganizationDto.registrationNumber,
    );
    if (regNumExists) {
      throw new ConflictException(
        `Registration number "${createOrganizationDto.registrationNumber}" already exists`,
      );
    }

    const newOrganization: Organization = {
      id: generateId(),
      ...createOrganizationDto,
      status: createOrganizationDto.status ?? OrganizationStatus.ACTIVE,
      createdAt: now(),
      updatedAt: now(),
    };

    return await this.lowdb.insert('organizations', newOrganization);
  }

  async findAll(): Promise<Organization[]> {
    return await this.lowdb.getAll('organizations');
  }

  async findOne(id: string): Promise<Organization> {
    const organization = await this.lowdb.findById('organizations', id);
    if (!organization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.lowdb.findById('organizations', id);
    if (!organization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }

    if (
      updateOrganizationDto.registrationNumber &&
      updateOrganizationDto.registrationNumber !== organization.registrationNumber
    ) {
      const organizations = await this.lowdb.getAll('organizations');
      const regNumExists = organizations.some(
        (org) =>
          org.registrationNumber === updateOrganizationDto.registrationNumber && org.id !== id,
      );
      if (regNumExists) {
        throw new ConflictException(
          `Registration number "${updateOrganizationDto.registrationNumber}" already exists`,
        );
      }
    }

    const updated = await this.lowdb.update('organizations', id, {
      ...updateOrganizationDto,
      updatedAt: now(),
    });

    return updated!;
  }

  async remove(id: string): Promise<void> {
    const organization = await this.lowdb.findById('organizations', id);
    if (!organization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    await this.lowdb.remove('organizations', id);
  }
}
