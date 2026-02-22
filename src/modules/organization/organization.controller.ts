import {
  Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Organization } from './entities/organization.entity';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new organization' })
  @SwaggerApiResponse({ status: 201, description: 'Organization created successfully' })
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.create(createOrganizationDto);
    return { success: true, message: 'Organization created successfully', data };
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @SwaggerApiResponse({ status: 200, description: 'Organizations retrieved successfully' })
  async findAll(): Promise<ApiResponse<Organization[]>> {
    const data = await this.organizationService.findAll();
    return { success: true, message: 'Organizations retrieved successfully', data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organization by ID' })
  @SwaggerApiResponse({ status: 200, description: 'Organization retrieved successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Organization not found' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.findOne(id);
    return { success: true, message: 'Organization retrieved successfully', data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace an organization (full update)' })
  @SwaggerApiResponse({ status: 200, description: 'Organization replaced successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Organization not found' })
  async replace(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.update(id, updateOrganizationDto);
    return { success: true, message: 'Organization replaced successfully', data };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update an organization' })
  @SwaggerApiResponse({ status: 200, description: 'Organization updated successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Organization not found' })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.update(id, updateOrganizationDto);
    return { success: true, message: 'Organization updated successfully', data };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an organization' })
  @SwaggerApiResponse({ status: 200, description: 'Organization deleted successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Organization not found' })
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.organizationService.remove(id);
    return { success: true, message: 'Organization deleted successfully', data: null };
  }
}
