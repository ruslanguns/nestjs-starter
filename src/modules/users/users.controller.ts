import { Controller, Post, Body, Get, ParseArrayPipe, Param, Query, Put, Delete, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBody,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiQuery,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { UsersService } from './services';
import { CreateUserDto, UpdateUserDto } from './dto';
import { DataOutput, IUser } from 'src/common/interfaces';
import { User } from './entities';

@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase'],
  },
  serialize: {
    getMany: User,
  },
  query: {
    maxLimit: 100,
    cache: 1000,
    alwaysPaginate: true,
    join: {
      users: {
        eager: false,
        required: false,
      },
      contactInfo: {
        eager: false,
        required: false,
      },
      'contactInfo.addresses': {
        eager: false,
        required: false,
      },
      'contactInfo.phones': {
        eager: false,
        required: false,
      },
      metadata: {
        required: false,
      },
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }

  /**
   * Create Users - Batch
   * @param dto User Form but in Array format
   * @example POST /users/bulk
   */
  @ApiTags('Users batch operations')
  @ApiOperation({ summary: 'Create Users - Batch', description: 'Register users in batch.' })
  @ApiCreatedResponse({ status: 201, description: 'Users created successfully', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiBody({ type: [CreateUserDto] })
  @Post('bulk')
  async createBulk(@Body(new ParseArrayPipe({ items: CreateUserDto })) dto: CreateUserDto[]): Promise<DataOutput<IUser[]>> {
    return { message: 'Users created successfully', output: await this.service.createBatch(dto) };
  }

  /**
   * Get users by ids - Batch
   * @param ids User ID integer Array
   * @example GET /users/bulk?ids=1,2,3
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Get Users by ids- Batch',
    description: 'Get users by Ids. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response', type: [User] })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Get('bulk')
  async getByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await this.service.getByIds(ids);
  }

  /**
   * Update many
   * @param dtos Update User Form including the ID insude
   * @example PUT /users/bulk
   */
  @ApiTags('Users batch operations')
  @ApiOperation({ summary: 'Update users - Batch', description: 'Update users. You have to provide an id each object inside an updateUserDTO' })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiBody({ required: true, type: [UpdateUserDto] })
  @Put('bulk')
  async updateMany(@Body(new ParseArrayPipe({ items: UpdateUserDto })) dtos: UpdateUserDto[]) {
    return await this.service.updateMany(dtos);
  }

  /**
   * Softdelete users (SOFT DELETION)
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Softdelete users - Batch',
    description: '(SOFT DELETION) Delete users. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Delete('bulk')
  async deleteMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await this.service.softDeleteMany(ids);
  }

  /**
   * Delete many (ATENTTION: PERMANENT DELETION)
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users?ids=1,2,3
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Hard delete users - Batch',
    description: '(HARD DELETION) Delete users. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Delete('bulk/hard')
  async hardDeleteMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await this.service.deleteMany(ids);
  }

  /**
   * Restore softdeleted users
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk/restore?ids=1,2,3
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Restore users - Batch',
    description: 'Restore users. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Patch('bulk/restore')
  async restoreMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await this.service.restoreMany(ids);
  }

  /**
   * Disable users
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk/disable?ids=1,2,3
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Disable users - Batch',
    description: 'Disable users. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Patch('bulk/disable')
  async disableMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await this.service.disableMany(ids);
  }

  /**
   * Enable users
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk/enable?ids=1,2,3
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Enable users - Batch',
    description: 'Enable users. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Patch('bulk/enable')
  async enableMany(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await this.service.enableMany(ids);
  }

  /**
   * Get users by ids - Batch
   * @param ids User ID integer Array
   * @example GET /users/bulk?ids=1,2,3
   */
  @ApiTags('Users batch operations')
  @ApiOperation({
    summary: 'Get Users by ids- Batch',
    description: 'Get Deleted users by Ids. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: false, type: 'number', example: '1,2,3', explode: false })
  @Get('bulk/deleted')
  async getSoftdeletedUsersByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids?: number[]) {
    return await this.service.getDeletedUsers(ids);
  }

  /**
   * Create User  - Single
   * @param dto User Form
   * @example POST /users
   */
  @ApiTags('Users single operation')
  @ApiOperation({ summary: 'Create User  - Single', description: 'Register an user, this can be public or privated.' })
  @ApiCreatedResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with the validation issues' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<DataOutput<User>> {
    return { message: 'User created successfully', output: await this.service.create(dto) };
  }

  /**
   * Get deleted users - Batch
   * @example GET /users/bulk?ids=1,2,3
   */
  @ApiTags('Users single operation')
  @ApiOperation({
    summary: 'Get Deleted Users by ids- Batch',
    description: 'Get users by Ids. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: false, type: 'number', example: '1,2,3', explode: false })
  @Get('deleted')
  async getSoftdeletedUsers() {
    return await this.service.getDeletedUsers();
  }

  /**
   * Update one - Single
   * @param dto Update User Form
   * @example PUT /users
   */
  @ApiTags('Users single operation')
  @ApiOperation({ summary: 'Update user - Single', description: 'Update user by Id. You have to provide an id in the body' })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiBody({ required: true, type: UpdateUserDto })
  @Put()
  async updateOne(@Body() dto: UpdateUserDto) {
    return await this.service.update(dto);
  }

  /**
   * Softdelete user (SOFT DELETION)
   * @param ids User ID integer
   * @example DELETE /users
   */
  @ApiTags('Users single operation')
  @ApiOperation({
    summary: 'Softdelete user - Batch',
    description: '(SOFT DELETION) Delete user. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: '1' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.softDelete(id);
  }

  /**
   * Delete one (ATENTTION: PERMANENT DELETION)
   * @param id User ID integer
   */
  @ApiTags('Users single operation')
  @ApiOperation({
    summary: 'Hard delete  user - Batch',
    description: '(HARD DELETION) Delete user. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: '1' })
  @Delete(':id/hard')
  async hardDelete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

  /**
   * Restore softdeleted user
   * @param ids User ID integer
   * @example DELETE /users/1/restore
   */
  @ApiTags('Users single operation')
  @ApiOperation({
    summary: 'Restore user - Batch',
    description: 'Restore user. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: '1' })
  @Patch(':id/restore')
  async restore(@Param('id') id: number) {
    return await this.service.restore(id);
  }

  /**
   * Disable user
   * @param ids User ID integer
   * @example DELETE /users/1/disable
   */
  @ApiTags('Users single operation')
  @ApiOperation({
    summary: 'Disable user - single',
    description: 'Disable user. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: '1' })
  @Patch(':id/disable')
  async disable(@Param('id') id: number) {
    return await this.service.disable(id);
  }

  /**
   * Enable one user
   * @param ids User ID integer
   * @example DELETE /users/1/enable
   */
  @ApiTags('Users single operation')
  @ApiOperation({
    summary: 'Enable user - Batch',
    description: 'Enable user. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: '1' })
  @Patch(':id/enable')
  async enable(@Param('id') id: number) {
    return await this.service.enable(id);
  }
}
