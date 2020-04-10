import { Controller, Post, Body, Get, Param, ParseArrayPipe } from '@nestjs/common';

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

  @Post('bulk')
  async createBulk(
    @Body(new ParseArrayPipe({ items: CreateUserDto })) dto: CreateUserDto[]
  ): Promise<DataOutput<IUser[]>> {
    return { message: 'User created successfully', output: await this.userService.createBulk(dto) };
  }

  @Get()
  async getAll() {
    return { output: await this.userService.getAll() };
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return { output: await this.userService.getById(id) }
  }
}
