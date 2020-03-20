import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import configSchema from './config/config.schema';


import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database/database.module';


@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: `environment/.env.${process.env.NODE_ENV || 'development'}`,
            load: [serverConfig, databaseConfig],
            validationSchema: configSchema,
            isGlobal: true,
        }),
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
