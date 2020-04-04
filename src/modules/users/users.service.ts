import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,
    ) {}

    async findAll() {
        return await this.userEntity.find();
    }
}
