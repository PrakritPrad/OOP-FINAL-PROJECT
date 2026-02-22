import {
  Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @SwaggerApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    const data = await this.userService.create(createUserDto);
    return { success: true, message: 'User created successfully', data };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @SwaggerApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll(): Promise<ApiResponse<User[]>> {
    const data = await this.userService.findAll();
    return { success: true, message: 'Users retrieved successfully', data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @SwaggerApiResponse({ status: 200, description: 'User retrieved successfully' })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<User>> {
    const data = await this.userService.findOne(id);
    return { success: true, message: 'User retrieved successfully', data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace a user (full update)' })
  @SwaggerApiResponse({ status: 200, description: 'User replaced successfully' })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
  async replace(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const data = await this.userService.update(id, updateUserDto);
    return { success: true, message: 'User replaced successfully', data };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a user' })
  @SwaggerApiResponse({ status: 200, description: 'User updated successfully' })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const data = await this.userService.update(id, updateUserDto);
    return { success: true, message: 'User updated successfully', data };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a user' })
  @SwaggerApiResponse({ status: 200, description: 'User deleted successfully' })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.userService.remove(id);
    return { success: true, message: 'User deleted successfully', data: null };
  }
}
