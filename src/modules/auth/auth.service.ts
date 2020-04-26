import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UsersService } from '../users/users.service';
import { PATTERN_VALID_EMAIL } from '../../config/config.constants';
import { User } from '../users/entities';

export interface ApiLoginSuccess {
  user: User;
  accessToken: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(userData: string, password: string): Promise<User> {
    // Verify if userData is email or username
    const data: { username?: string; email?: string } = {};
    !PATTERN_VALID_EMAIL.test(userData) ? (data.username = userData) : (data.email = userData);

    const user = await this.usersService.getByUser(data);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    if (!user.enabled) {
      throw new ForbiddenException('Account is disabled, contact with administrator');
    }
    const isMatch = await compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    delete user.password;
    return user;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      output: {
        user,
        accessToken: this.jwtService.sign(payload),
      },
    };
  }
}
