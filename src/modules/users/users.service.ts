import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { User, UserMetadata } from './entities';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserMetadata)
        private readonly userMetadataRepository: Repository<UserMetadata>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }

    async createBulk(dto: CreateUserDto[]): Promise<User[]> {
        const users = this.userRepository.create(dto);
        return await this.userRepository.save(users);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getById(id: number): Promise<User | null> {
        return await this.userRepository.findOne(id) || null;
    }

    async getByIds(ids: number[]): Promise<User[]> {
        return await this.userRepository.findByIds(ids);
    }
}
