import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';

import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async createBulk(dto: CreateUserDto[]): Promise<User[]> {
    const users = this.userRepository.create(dto);
    return await this.userRepository.save(users);
  }

  async getMany(query?: CrudRequest): Promise<User[]> {
    console.log(query);
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User | null> {
    return (await this.userRepository.findOne(id)) || null;
  }

  async getByIds(ids: number[]): Promise<User[]> {
    return await this.userRepository.findByIds(ids);
  }
}
