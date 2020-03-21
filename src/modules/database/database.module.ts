import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CONFIG_DB_CONFIG } from '../../config/config.constants';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => (configService.get<MongooseModuleOptions>(CONFIG_DB_CONFIG)),
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule { }
