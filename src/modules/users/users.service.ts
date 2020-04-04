import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserMetadata } from './entities';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,
        @InjectRepository(UserMetadata)
        private readonly userMetadataEntity: Repository<UserMetadata>,

    ) {}

    async findAll() {
        return await this.userEntity.find();
    }

}
