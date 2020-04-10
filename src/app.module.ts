import { Module } from '@nestjs/common';
import { CoreModule } from './core';

import { AuthModule, UsersModule } from './modules';

import { AppController } from './app.controller';
import { TaxonomyModule } from './modules/taxonomy/taxonomy.module';

@Module({
  controllers: [AppController],
  imports: [CoreModule, AuthModule, UsersModule, TaxonomyModule],
})
export class AppModule {}
