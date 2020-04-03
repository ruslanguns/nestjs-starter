import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CONFIG_DB_CONFIG } from '../../config/config.constants';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>(CONFIG_DB_CONFIG),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
