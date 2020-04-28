import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';

import { User, UserMetadata } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserMetadata)
    private readonly userMetadataRepository: Repository<UserMetadata>,
  ) {}

  /**
   * Get User Metadata by User Id
   * @param id User ID
   */
  async getUserMeta(id: number) {
    const user = await this.userRepository.findOne(id);
    return await this.userMetadataRepository.find({ user });
  }

  /**
   * Create user
   * @param dto CreateUserDto
   */
  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const result = await this.userRepository.save(user);
    delete result.password;
    return result;
  }

  /**
   * Create users in batch
   * @param dto Array of CreateUserDto
   */
  async createMany(dto: CreateUserDto[]): Promise<User[]> {
    const users = this.userRepository.create(dto);
    const result = await this.userRepository.save(users).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });

    for (const res of result) {
      delete res.password;
    }
    return result;
  }

  /**
   * Get by username or email
   * @param data { username: string, email: string }
   */
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

  /**
   * Get user by id
   * @param id User id
   */
  async getById(id: number): Promise<User | null> {
    return (
      (await this.userRepository.findOne(id).catch((err) => {
        throw new BadGatewayException('Something happened', err);
      })) || null
    );
  }

  /**
   * Get users by ids
   * @param ids Get user by array of Ids
   */
  async getByIds(ids: number[]): Promise<User[]> {
    return await this.userRepository.findByIds(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Get all users
   * @param query Query Params [CrudRequest] https://github.com/nestjsx/crud/wiki/Requests#query-params
   */
  async getMany(query?: CrudRequest): Promise<User[]> {
    return await this.userRepository.find().catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Update an user
   * @param dto UpdateUserDto
   */
  async update(dto: UpdateUserDto): Promise<User> {
    if (!dto.id) {
      throw new BadRequestException('You need to provide a valid id');
    }

    const user = await this.getById(dto.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete dto.id; // Deleting this input to avoid issues with entity
    const editedUser = Object.assign(user, dto);
    const result = await this.userRepository.save<User>(editedUser);
    delete result.password;
    return result;
  }

  /**
   * Update users in batch
   * @param dtos Array of UpdateUserDto
   */
  async updateMany(dtos: UpdateUserDto[]): Promise<User[]> {
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
    const result = await this.userRepository.save<User>(updatedUsers).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });

    for (const res of result) {
      delete res.password;
    }

    return result;
  }

  /**
   * Soft delete an user by id
   * @param id User id
   */
  async softDelete(id: number) {
    return await this.userRepository.softDelete(id).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Soft delete users in batch
   * @param ids Array of user ids
   */
  async softDeleteMany(ids: number[]) {
    return await this.userRepository.softDelete(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Hard delete an user by id
   * @param id User id
   */
  async delete(id: number) {
    return await this.userRepository.delete(id).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Hard delete of users in batch by ids
   * @param ids Array of user ids
   */
  async deleteMany(ids: number[]) {
    return await this.userRepository.delete(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Restore soft-deleted user by id
   * @param id User id
   */
  async restore(id: number) {
    return await this.userRepository.restore(id).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Restore soft-deleted users in batch by ids
   * @param ids Array of ids
   */
  async restoreMany(ids: number[]) {
    return await this.userRepository.restore(ids).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Disable an user
   * @param id User id
   */
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

  /**
   * Disable users in batch by ids
   * @param ids Array of user ids
   */
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

  /**
   * Enable user by id
   * @param id User id
   */
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

  /**
   * Enable users in batch by ids
   * @param ids Array of user ids
   */
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
