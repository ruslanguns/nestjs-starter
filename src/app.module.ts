import { Module } from '@nestjs/common';
import { CoreModule } from './core';

import {
    AuthModule,
    UsersModule,
    OtpModule
} from './modules';

import { AppController } from './app.controller';


@Module({
    controllers: [AppController],
    imports: [
        CoreModule,
        AuthModule,
        UsersModule,
        OtpModule,
        CoreModule,
    ],
})
export class AppModule { }
