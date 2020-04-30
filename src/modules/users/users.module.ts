import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService, ContactInfoService } from './services';
import { UsersController } from './users.controller';
import { User, UserMetadata, ContactInfo, ContactAddress, ContactPhone } from './entities';
import { ContactController } from './contact.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMetadata, ContactInfo, ContactAddress, ContactPhone])],
  providers: [UsersService, ContactInfoService],
  exports: [UsersService],
  controllers: [UsersController, ContactController],
})
export class UsersModule {}
