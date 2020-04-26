import { Controller, Post, Body, Get, ParseArrayPipe, UseInterceptors, Param, Query, Put, Delete, Patch } from '@nestjs/common';
import { CrudRequestInterceptor, ParsedRequest, CrudRequest } from '@nestjsx/crud';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { DataOutput, IUser } from 'src/common/interfaces';
import { User } from './entities';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Create User - User Registration
   * @param dto User Form
   * // FIXME: Quitar password del output
   */
  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<DataOutput<IUser>> {
    return { message: 'User created successfully', output: await this.userService.create(dto) };
  }

  /**
   * Create Users - Users registration in Bulk
   * @param dto User Form but in Array format
   */
  @Post('bulk')
  async createBulk(@Body(new ParseArrayPipe({ items: CreateUserDto })) dto: CreateUserDto[]): Promise<DataOutput<IUser[]>> {
    return { message: 'User created successfully', output: await this.userService.createMany(dto) };
  }

  /**
   * Get user by IDS
   * @param ids User ID integers ?ids=1,2,3
   */
  @Get('bulk')
  async getByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]): Promise<DataOutput<User[]>> {
    return { output: await this.userService.getByIds(ids) };
  }

  /**
   * Get user by ID
   * @param id User ID integer
   */
  @Get(':id')
  async getById(@Param('id') id: number): Promise<DataOutput<User>> {
    return { output: await this.userService.getById(id) };
  }

  /**
   * Get users with support of query it
   * @param query Optional query submition for filtering, pagining, sorting, etc.
   * @example https://github.com/nestjsx/crud/wiki/Requests#query-params
   * // TODO: make functionality for query
   */
  @Get()
  @UseInterceptors(CrudRequestInterceptor)
  async getAll(@ParsedRequest() query: CrudRequest): Promise<DataOutput<User[]>> {
    return { output: await this.userService.getMany(query) };
  }

  /**
   * Update one
   * @param dto Update User Form
   */
  @Put()
  async updateOne(@Body() dto: UpdateUserDto) {
    return { output: await this.userService.update(dto) };
  }

  /**
   * Update many
   * @param dtos Update User Form including the ID insude
   */
  @Put('bulk')
  async updateMany(@Body(new ParseArrayPipe({ items: UpdateUserDto })) dtos: UpdateUserDto[]) {
    return { output: await this.userService.updateMany(dtos) };
  }

  /**
   * Delete many (SOFT DELETION)
   * @param ids User ID integers ?ids=1,2,3
   */
  @Delete()
  async deleteMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return { output: await this.userService.softDeleteMany(ids) };
  }

  /**
   * Delete one (SOFT DELETION)
   * @param ids User ID integer
   */
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return { output: await this.userService.softDelete(id) };
  }

  /**
   * Delete many (ATENTTION: PERMANENT DELETION)
   * @param ids User ID integers ?ids=1,2,3
   */
  @Delete('hard')
  async hardDeleteMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return { output: await this.userService.deleteMany(ids) };
  }

  /**
   * Delete one (ATENTTION: PERMANENT DELETION)
   * @param ids User ID integer
   */
  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number) {
    return { output: await this.userService.delete(id) };
  }

  /**
   * Restore softdeleted users
   * @param ids User ID integers ?ids=1,2,3
   */
  @Patch('restore/bulk')
  async restoreMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return { output: await this.userService.restoreMany(ids) };
  }

  /**
   * Restore softdeleted user
   * @param ids User ID integer
   */
  @Patch('restore/:id')
  async restore(@Param('id') id: number) {
    return { output: await this.userService.restore(id) };
  }

  /**
   * Disable users
   * @param ids User ID integers ?ids=1,2,3
   */
  @Patch('disable/bulk')
  async disableMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return { output: await this.userService.disableMany(ids) };
  }

  /**
   * Disable one user
   * @param ids User ID integer
   */
  @Patch('disable/:id')
  async disable(@Param('id') id: number) {
    return { output: await this.userService.disable(id) };
  }

  /**
   * Enable users
   * @param ids User ID integers ?ids=1,2,3
   */
  @Patch('enable/bulk')
  async enableMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return { output: await this.userService.enableMany(ids) };
  }

  /**
   * Enable one user
   * @param ids User ID integer
   */
  @Patch('enable/:id')
  async enable(@Param('id') id: number) {
    return { output: await this.userService.enable(id) };
  }
}
