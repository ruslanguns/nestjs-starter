import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import configSchema from './config/config.schema';

import {
    AuthModule,
    UsersModule,
    DatabaseModule,
    OtpModule
} from './modules';

import { AppController } from './app.controller';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `environment/.env.${process.env.NODE_ENV || 'development'}`,
            load: [serverConfig, databaseConfig],
            validationSchema: configSchema,
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        DatabaseModule,
        OtpModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
