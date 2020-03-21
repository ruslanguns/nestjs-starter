import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => (configService.get<MongooseModuleOptions>('database.config')),
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule { }
