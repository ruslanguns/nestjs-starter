import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule.registerAsync({
      useFactory: async (config: ConfigService) => ({}),
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => (config.get('server.jwt')),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
