import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { BaseService } from '../../common/services';
import { User } from './user.model';


@Injectable()
export class UsersService extends BaseService<User> {

    constructor(
        @InjectModel(User.modelName)
        private readonly userModel: ReturnModelType<typeof User>,
    ) {
        super(userModel)
    }

}
