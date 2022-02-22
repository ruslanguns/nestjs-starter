import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@rewiko/crud';
import { TypeOrmCrudService } from '@rewiko/crud-typeorm';
import { Repository } from 'typeorm';

import { User, UserMetadata } from '../entities';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserMetadata)
    private readonly userMetadataRepository: Repository<UserMetadata>,
  ) {
    super(userRepository);
  }

  /**
   * Get
   * @param ids OPTIONAL array of number of user ids
   */
  async getDeletedUsers(ids?: number[]) {
    if (!!ids && ids.length) {
      return await this.userRepository.findByIds(ids, { withDeleted: true });
    }

    return await this.userRepository.find({ withDeleted: true });
  }

  /**
   * Get User Metadata by User Id
   * @param id User ID
   */
  async getUserMeta() {
    // const user = await this.userRepository.findOne(id);
    return await this.userMetadataRepository.find();
  }

  /**
   * Create user
   * @param dto CreateUserDto
   */
  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    const result = await this.userRepository.save(user);
    delete result.password;
    return result;
  }

  /**
   * Create users in batch
   * @param dto Array of CreateUserDto
   */
  async createBatch(dto: CreateUserDto[]): Promise<User[]> {
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
  async getOneById(id: number): Promise<User | null> {
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
  async getBatch(query?: CrudRequest): Promise<GetManyDefaultResponse<User> | User[]> {
    // return await this.userRepository.find().catch((err) => {
    //   throw new BadGatewayException('Something happened', err);
    // });
    return await this.getMany(query);
  }

  /**
   * Update an user
   * @param dto UpdateUserDto
   */
  async update(dto: UpdateUserDto): Promise<User> {
    if (!dto.id) {
      throw new BadRequestException('You need to provide a valid id');
    }

    const user = await this.userRepository.findOne(dto.id);
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
        const user = await this.userRepository.findOne(dto.id);
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
    const user = await this.userRepository.findOne(id);
    return await this.userRepository.softRemove(user).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Soft delete users in batch
   * @param ids Array of user ids
   */
  async softDeleteMany(ids: number[]) {
    const usersRemoved: User[] = [];

    for (let i = 0; i < ids.length; i++) {
      const user = await this.userRepository.findOne(ids[i]);
      if (!!user) {
        const result = await this.userRepository.softRemove(user);
        usersRemoved.push(result);
      }
    }

    return usersRemoved;
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
    const user = await this.userRepository.findOne({ withDeleted: true });
    return await this.userRepository.recover(user).catch((err) => {
      throw new BadGatewayException('Something happened', err);
    });
  }

  /**
   * Restore soft-deleted users in batch by ids
   * @param ids Array of ids
   */
  async restoreMany(ids: number[]) {
    const usersRecovered: User[] = [];
    for (let i = 0; i < ids.length; i++) {
      const user = await this.userRepository.findOne(ids[i], { withDeleted: true });
      if (!!user) {
        const result = await this.userRepository.recover(user);
        usersRecovered.push(result);
      }
    }
    return usersRecovered;
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
