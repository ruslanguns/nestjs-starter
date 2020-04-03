import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { DataOutput } from '../../common/interfaces/api-response.interface';
import { UsersService } from '../users/users.service';

export interface ApiLoginSuccess {
    user: ''; // TODO: poner el tipado correcto del modelo
    accessToken: string;
}

export interface JwtPayload {
    id: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        // const user = await this.usersService.findOneAsync({ email });
        // if (!user) {
        //     throw new NotFoundException('Invalid credentials');
        // }
        // const isMatch = await compareSync(password, user.password);
        // if (!isMatch) {
        //     throw new BadRequestException('Invalid credentials');
        // }
        // return user;
    }

    async login(user: any): Promise<DataOutput<ApiLoginSuccess>> {
        const payload: JwtPayload = { id: '123' };
        return {
            output: {
                user,
                accessToken: this.jwtService.sign(payload),
            },
        };
    }
}
