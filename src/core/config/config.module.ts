import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModulePackage } from '@nestjs/config';

import serverConfig from 'src/config/server.config';
import databaseConfig from 'src/config/database.config';
import configSchema from 'src/config/config.schema';

@Module({
    imports: [
        ConfigModulePackage.forRoot({
            envFilePath: `environment/.env.${process.env.NODE_ENV || 'development'}`,
            load: [serverConfig, databaseConfig],
            validationSchema: configSchema,
            isGlobal: true,
        }),
    ]
})
export class ConfigModule { }
