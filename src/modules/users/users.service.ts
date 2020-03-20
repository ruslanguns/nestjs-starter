import { Injectable } from '@nestjs/common';
import { IUser } from './users.interface';


@Injectable()
export class UsersService {
    private readonly users: IUser[];

    constructor() {
        this.users = [
            {
                id: '1',
                name: 'john',
                email: 'john@email.com',
                password: 'changeme',
            },
            {
                id: '2',
                name: 'chris',
                email: 'chris@email.com',
                password: 'secret',
            },
            {
                id: '3',
                name: 'maria',
                email: 'maria@email.com',
                password: 'guess',
            },
        ];
    }

    async findOne(email: string): Promise<IUser | undefined> {
        return this.users.find(user => user.email === email);
    }

    async find() {
        return this.users;
    }

    async update() { }

    async delete() { }
}
