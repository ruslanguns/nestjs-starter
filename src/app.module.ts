import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';


import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import configSchema from './config/config.schema';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: `environment/.env.${process.env.NODE_ENV || 'development'}`,
            load: [serverConfig, databaseConfig],
            validationSchema: configSchema,
            isGlobal: true,
        })
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
