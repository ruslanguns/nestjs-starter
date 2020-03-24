import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.model';
import { UsersController } from './users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.modelName, schema: User.schema }
        ])
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule { }
