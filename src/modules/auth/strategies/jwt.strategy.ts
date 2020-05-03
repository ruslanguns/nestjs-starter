import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../auth.service';
import { CONFIG_SERVER_JWT_SECRET } from '../../../config/config.constants';
import { UsersService } from '../../users/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(CONFIG_SERVER_JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getOneById(payload.sub);
  }
}
