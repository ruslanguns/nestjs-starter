import { Controller, Get, Post, Put, Delete, Patch, Param, Body } from '@nestjs/common';

import { DataOutput } from '../../common/interfaces/api-response.interface';
import { ValidateObjectId } from '../../common/pipes/validate-object-id.pipe';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async get(): Promise<DataOutput<User[]>> {
        return { output: await this.usersService.findAllAsync() };
    }

    @Get(':id')
    async getById(
        @Param('id', new ValidateObjectId()) id,
    ): Promise<DataOutput<User>> {
        return { output: await this.usersService.findByIdAsync(id) };
    }

    @Post()
    async create(
        @Body() dto: CreateUserDto, // TODO: quitar password del payload de salida
    ): Promise<DataOutput<User>> {
        const user = await this.usersService.create(dto)
        return { output: user };
    }

    @Put()
    async updateById(
        @Body() dto: EditUserDto,
    ): Promise<DataOutput<User>> {
        return { output: await this.usersService.updateAsync(dto) };
    }

    @Delete(':id')
    async deleteById(
        @Param('id', new ValidateObjectId()) id
    ): Promise<DataOutput<User>> {
        return { output: await this.usersService.deleteByIdAsync(id) };
    }

}
