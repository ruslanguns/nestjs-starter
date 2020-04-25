import { Controller, Post, Body, Get, ParseArrayPipe, UseInterceptors } from '@nestjs/common';
import { CrudRequestInterceptor, ParsedRequest, CrudRequest } from '@nestjsx/crud';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { DataOutput, IUser } from 'src/common/interfaces';
import { User } from './entities';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<DataOutput<IUser>> {
    return { message: 'User created successfully', output: await this.userService.create(dto) };
  }

  @Post('bulk')
  async createBulk(@Body(new ParseArrayPipe({ items: CreateUserDto })) dto: CreateUserDto[]): Promise<DataOutput<IUser[]>> {
    return { message: 'User created successfully', output: await this.userService.createBulk(dto) };
  }

  @Get()
  @UseInterceptors(CrudRequestInterceptor)
  async getAll(@ParsedRequest() query: CrudRequest): Promise<DataOutput<User[]>> {
    return { output: await this.userService.getMany(query) };
  }
}
