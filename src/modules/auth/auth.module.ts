import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule, IAuthModuleOptions } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CONFIG_SERVER_PASSPORT, CONFIG_SERVER_JWT } from '../../config/config.constants';

@Module({
  imports: [
    UsersModule,
    PassportModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get<IAuthModuleOptions>(CONFIG_SERVER_PASSPORT),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get(CONFIG_SERVER_JWT),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
