import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { DataOutput, IUser } from 'src/common/interfaces';


@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<DataOutput<IUser>> {
    return { message: 'User created successfully', output: await this.userService.create(dto) };
  }
}
