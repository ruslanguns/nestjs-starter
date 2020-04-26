import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';

import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    const result = await this.userRepository.save(user).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
    delete result.password;
    return result;
  }

  async createMany(dto: CreateUserDto[]): Promise<User[]> {
    const users = this.userRepository.create(dto);
    return await this.userRepository.save(users).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async getByUser(data: { username?: string; email?: string }): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .addSelect('user.enabled')
      .getOne()
      .catch((err) => {
        throw new BadGatewayException('Something happened', err);
      });
  }

  async getById(id: number): Promise<User | null> {
    return (
      (await this.userRepository.findOne(id).catch((err) => {
        throw new BadGatewayException('Something happened', err);
      })) || null
    );
  }

  async getByIds(ids: number[]): Promise<User[]> {
    return await this.userRepository.findByIds(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async getMany(query?: CrudRequest): Promise<User[]> {
    return await this.userRepository.find().catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async update(dto: UpdateUserDto) {
    if (!dto.id) {
      throw new BadRequestException('You need to provide a valid id');
    }

    const user = await this.getById(dto.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete dto.id; // Deleting this input to avoid issues with entity
    const editedUser = Object.assign(user, dto);
    const result = await this.userRepository.save(editedUser);
    delete result.password;
    return result;
  }

  async updateMany(dtos: UpdateUserDto[]) {
    const updatedUsers = [];
    for (const dto of dtos) {
      if (dto.id) {
        const user = await await this.getById(dto.id);
        if (!!user) {
          delete dto.id; // Deleting this input to avoid issues with entity
          const editedUser = Object.assign(user, dto);
          updatedUsers.push(editedUser);
        }
      }
    }
    const result = await this.userRepository.save(updatedUsers).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });

    for (const res of result) {
      delete res.password;
    }

    return result;
  }

  async softDelete(id: number) {
    return await this.userRepository.softDelete(id).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async softDeleteMany(ids: number[]) {
    return await this.userRepository.softDelete(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async delete(id: number) {
    return await this.userRepository.delete(id).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async deleteMany(ids: number[]) {
    return await this.userRepository.delete(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async restore(id: number) {
    return await this.userRepository.restore(id).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async restoreMany(ids: number[]) {
    return await this.userRepository.restore(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  async disable(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.enabled')
      .update()
      .set({ enabled: false })
      .where('id = :id', { id })
      .execute()
      .catch((err) => {
        throw new BadGatewayException('Something happened', err);
      });
  }

  async disableMany(ids: number[]) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.enabled')
      .update()
      .set({ enabled: false })
      .where('id IN (:...ids)', { ids })
      .execute()
      .catch((err) => {
        throw new BadGatewayException('Something happened', err);
      });
  }

  async enable(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.enabled')
      .update()
      .set({ enabled: true })
      .where('id = :id', { id })
      .execute()
      .catch((err) => {
        throw new BadGatewayException('Something happened', err);
      });
  }

  async enableMany(ids: number[]) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.enabled')
      .update()
      .set({ enabled: true })
      .where('id IN (:...ids)', { ids })
      .execute()
      .catch((err) => {
        throw new BadGatewayException('Something happened', err);
      });
  }
}
