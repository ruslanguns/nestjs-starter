import { Module } from '@nestjs/common';
import { CoreModule } from './core';

import { AuthModule, UsersModule } from './modules';

import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [CoreModule, AuthModule, UsersModule],
})
export class AppModule {}
