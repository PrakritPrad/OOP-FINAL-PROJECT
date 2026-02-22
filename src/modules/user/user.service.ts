import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';
import { LowdbService } from '../../common/database/lowdb.service';
import { generateId } from '../../common/utils/id-generator';
import { now } from '../../common/utils/date-utils';

@Injectable()
export class UserService {
  constructor(private readonly lowdb: LowdbService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.lowdb.getAll('users');

    const emailExists = users.some((u) => u.email === createUserDto.email);
    if (emailExists) {
      throw new ConflictException(`Email "${createUserDto.email}" already exists`);
    }

    const newUser: User = {
      id: generateId(),
      ...createUserDto,
      isEmailVerified: createUserDto.isEmailVerified ?? false,
      status: createUserDto.status ?? UserStatus.ACTIVE,
      createdAt: now(),
      updatedAt: now(),
    };

    return await this.lowdb.insert('users', newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.lowdb.getAll('users');
  }

  async findOne(id: string): Promise<User> {
    const user = await this.lowdb.findById('users', id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.lowdb.findById('users', id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const users = await this.lowdb.getAll('users');
      const emailExists = users.some((u) => u.email === updateUserDto.email && u.id !== id);
      if (emailExists) {
        throw new ConflictException(`Email "${updateUserDto.email}" already exists`);
      }
    }

    const updated = await this.lowdb.update('users', id, {
      ...updateUserDto,
      updatedAt: now(),
    });

    return updated!;
  }

  async remove(id: string): Promise<void> {
    const user = await this.lowdb.findById('users', id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.lowdb.remove('users', id);
  }
}
