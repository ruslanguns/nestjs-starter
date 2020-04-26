import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository, FindOneOptions } from 'typeorm';

import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(dto);
      return await this.userRepository.save(user);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async createMany(dto: CreateUserDto[]): Promise<User[]> {
    try {
      const users = this.userRepository.create(dto);
      return await this.userRepository.save(users);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async getByUser(data: { username?: string; email?: string }): Promise<User> {
    try {
      return this.userRepository.createQueryBuilder('user').where(data).addSelect('user.password').getOne();
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      return (await this.userRepository.findOne(id)) || null;
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async getByIds(ids: number[]): Promise<User[]> {
    try {
      return await this.userRepository.findByIds(ids);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async getMany(query?: CrudRequest): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async update(dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(dto.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const editedUser = Object.assign(user, dto);
      return await this.userRepository.save([editedUser]);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async updateMany(dtos: UpdateUserDto[]) {
    try {
      const updatedUsers = [];
      for (const dto of dtos) {
        if (dto.id) {
          const { id } = dto;
          const user = await this.userRepository.findOne(id);
          if (!!user) {
            const editedUser = Object.assign(user, dto);
            updatedUsers.push(editedUser);
          }
        }
      }
      return await this.userRepository.save(updatedUsers);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async softDelete(id: number) {
    try {
      return await this.userRepository.softDelete(id);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async softDeleteMany(ids: number[]) {
    try {
      return await this.userRepository.softDelete(ids);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async delete(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async deleteMany(ids: number[]) {
    try {
      return await this.userRepository.delete(ids);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async restore(id: number) {
    try {
      return await this.userRepository.restore(id);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }

  async restoreMany(ids: number[]) {
    try {
      return await this.userRepository.restore(ids);
    } catch (err) {
      throw new BadGatewayException('Something happened', err);
    }
  }
}
