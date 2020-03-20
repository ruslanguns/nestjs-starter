import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DataOutput } from 'src/common/interfaces/api-response.interface';

export interface ApiLoginSuccess {
    access_token: string;
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

    async login(user: any): Promise<DataOutput<ApiLoginSuccess>> {
        const payload = { email: user.email, sub: user.id };
        return {
            output: {
                access_token: this.jwtService.sign(payload),
            }
        };
    }
}
