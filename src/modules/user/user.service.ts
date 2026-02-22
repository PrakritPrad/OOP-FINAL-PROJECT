import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus, SafeUser } from './entities/user.entity';
import { LowdbService } from '../../common/database/lowdb.service';
import { generateId } from '../../common/utils/id-generator';
import { now } from '../../common/utils/date-utils';

function stripPassword(user: User): SafeUser {
  const { password: _pw, ...safe } = user;
  return safe;
}

@Injectable()
export class UserService {
  constructor(private readonly lowdb: LowdbService) { }

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const users = await this.lowdb.getAll('users');

    const emailExists = users.some((u) => u.email === createUserDto.email);
    if (emailExists) {
      throw new ConflictException(`Email "${createUserDto.email}" already exists`);
    }

    const usernameExists = users.some((u) => u.username === createUserDto.username);
    if (usernameExists) {
      throw new ConflictException(`Username "${createUserDto.username}" already exists`);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser: User = {
      id: generateId(),
      ...createUserDto,
      password: hashedPassword,
      isEmailVerified: createUserDto.isEmailVerified ?? false,
      status: createUserDto.status ?? UserStatus.ACTIVE,
      createdAt: now(),
      updatedAt: now(),
    };

    const saved = await this.lowdb.insert('users', newUser);
    return stripPassword(saved);
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.lowdb.getAll('users');
    return users.map(stripPassword);
  }

  async findOne(id: string): Promise<SafeUser> {
    const user = await this.lowdb.findById('users', id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return stripPassword(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const users = await this.lowdb.getAll('users');
    return users.find((u) => u.username === username) ?? null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
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

    return stripPassword(updated!);
  }

  async remove(id: string): Promise<void> {
    const user = await this.lowdb.findById('users', id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.lowdb.remove('users', id);
  }
}
