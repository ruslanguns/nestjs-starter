import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DataOutput } from '../../common/interfaces/api-response.interface';
import { UsersService } from '../users/users.service';
import { IUser } from '../../common/interfaces/users.interface';

export interface ApiLoginSuccess {
    user: IUser,
    accessToken: string;
}

export interface JwtPayload {
    id: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: IUser): Promise<DataOutput<ApiLoginSuccess>> {
        const payload: JwtPayload = { id: user.id };
        return {
            output: {
                user,
                accessToken: this.jwtService.sign(payload),
            }
        };
    }
}
