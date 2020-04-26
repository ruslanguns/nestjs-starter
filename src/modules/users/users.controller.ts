import { Controller, Post, Body, Get, ParseArrayPipe, UseInterceptors, Param, Query, Put, Delete, Patch } from '@nestjs/common';
import { CrudRequestInterceptor, ParsedRequest, CrudRequest } from '@nestjsx/crud';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { DataOutput, IUser } from 'src/common/interfaces';
import { User } from './entities';
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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Create User  - Single
   * @param dto User Form
   * @example POST /users
   */
  @ApiOperation({ summary: 'Create User  - Single', description: 'Register an user, this can be public or privated.' })
  @ApiCreatedResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with the validation issues' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<DataOutput<User>> {
    return { message: 'User created successfully', output: await this.userService.create(dto) };
  }

  /**
   * Create Users - Batch
   * @param dto User Form but in Array format
   * @example POST /users/bulk
   */
  @ApiOperation({ summary: 'Create Users - Batch', description: 'Register users in batch.' })
  @ApiCreatedResponse({ status: 201, description: 'Users created successfully', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiBody({ type: [CreateUserDto] })
  @Post('bulk')
  async createBulk(@Body(new ParseArrayPipe({ items: CreateUserDto })) dto: CreateUserDto[]): Promise<DataOutput<IUser[]>> {
    return { message: 'Users created successfully', output: await this.userService.createMany(dto) };
  }

  /**
   * Get users by ids - Single
   * @param ids User ID integers
   * @example GET /users/bulk?ids=1,2,3
   */
  @ApiOperation({
    summary: 'Get Users by ids- Single',
    description: 'Get users by Ids. You will have to provide a query param of ids separated by comas example: ?ids=1,2,3',
  })
  @ApiOkResponse({ status: 200, description: 'Success response', type: [User] })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'ids', required: true, type: 'string', example: '1,2,3' })
  @Get('bulk')
  async getByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]): Promise<DataOutput<User[]>> {
    return { output: await this.userService.getByIds(ids) };
  }

  /**
   * Get user by id - Single
   * @param id User ID integer
   * @example GET /users/1 where 1 is User ID integer
   */
  @ApiOperation({ summary: 'Get user by id - Single', description: 'Get user by Id. You have to provide an id in a url param' })
  @ApiOkResponse({ status: 200, description: 'Success response', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: '1' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<DataOutput<User | null>> {
    return { output: await this.userService.getById(id) };
  }

  /**
   * Get all users with query support
   * @param query Optional query submition for filtering, pagining, sorting, etc.
   * @example GET /users?s...
   * // https://github.com/nestjsx/crud/wiki/Requests#query-params
   * // TODO: make functionality for query
   * // TODO: document @ApiQuery with CrudRequest types
   */
  @ApiOperation({ summary: 'Get all users with query support', description: 'Get all users with query request supported' })
  @ApiOkResponse({ status: 200, description: 'Success response', type: [User] })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiQuery({ name: 'fields', required: false, type: 'string', example: 'field1,field2,...', description: 'get selected fields in GET result' })
  @ApiQuery({ name: 'select', required: false, type: 'string', example: 'field1,field2,...', description: 'get selected fields in GET result' })
  @ApiQuery({
    name: 's',
    required: false,
    type: 'json',
    example: '{"name": {"$or": {"$isnull": true, "$eq": "Superman"}}}',
    description: 'search conditions ($and, $or with all possible variations)',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: 'string',
    example: 'name||$eq||batman',
    description: 'filter GET result by AND type of condition',
  })
  @ApiQuery({
    name: 'or',
    required: false,
    type: 'string',
    example: 'name||$eq||batman&or=name||$eq||joker',
    description: 'filter GET result by OR type of condition',
  })
  @ApiQuery({
    name: 'join',
    required: false,
    type: 'string',
    example: 'profile||firstName,email&join=notifications||content&join=tasks...',
    description: 'receive joined relational resources in GET result (with all or selected fields)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: 'string',
    example: 'name,ASC&sort=id,DESC',
    description: 'sort GET result by some field in ASC | DESC order',
  })
  @ApiQuery({
    name: 'per_page',
    required: false,
    type: 'number',
    example: '10',
    description: 'per_page, limit - limit the amount of received resources',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    example: '10',
    description: 'per_page, limit - limit the amount of received resources',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: 'number',
    example: '10',
    description: 'offset some amount of received resources. Limit the amount of received resources',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number', example: '10', description: 'receive a portion of limited amount of resources' })
  @ApiQuery({
    name: 'cache',
    required: false,
    type: 'number',
    example: '0',
    description: 'reset cache (if was enabled) and receive resources directly from the DB',
  })
  @Get()
  @UseInterceptors(CrudRequestInterceptor)
  async getAll(@ParsedRequest() query: CrudRequest): Promise<DataOutput<User[]>> {
    return { output: await this.userService.getMany(query) };
  }

  /**
   * Update one - Single
   * @param dto Update User Form
   * @example PUT /users
   */
  @ApiOperation({ summary: 'Update user - Single', description: 'Update user by Id. You have to provide an id in the body' })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiBody({ required: true, type: UpdateUserDto })
  @Put()
  async updateOne(@Body() dto: UpdateUserDto) {
    return { output: await this.userService.update(dto) };
  }

  /**
   * Update many
   * @param dtos Update User Form including the ID insude
   * @example PUT /users/bulk
   */
  @ApiOperation({ summary: 'Update users - Batch', description: 'Update users. You have to provide an id each object inside an updateUserDTO' })
  @ApiOkResponse({ status: 200, description: 'Success response' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with an array with the validation issues' })
  @ApiBody({ required: true, type: [UpdateUserDto] })
  @Put('bulk')
  async updateMany(@Body(new ParseArrayPipe({ items: UpdateUserDto })) dtos: UpdateUserDto[]) {
    return { output: await this.userService.updateMany(dtos) };
  }

  /**
   * Softdelete users (SOFT DELETION)
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk
   */
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
    return { output: await this.userService.softDeleteMany(ids) };
  }

  /**
   * Softdelete user (SOFT DELETION)
   * @param ids User ID integer
   * @example DELETE /users
   */
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
    return { output: await this.userService.softDelete(id) };
  }

  /**
   * Delete many (ATENTTION: PERMANENT DELETION)
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users?ids=1,2,3
   */
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
    return { output: await this.userService.deleteMany(ids) };
  }

  /**
   * Delete one (ATENTTION: PERMANENT DELETION)
   * @param id User ID integer
   */
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
    return { output: await this.userService.delete(id) };
  }

  /**
   * Restore softdeleted users
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk/restore?ids=1,2,3
   */
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
    return { output: await this.userService.restoreMany(ids) };
  }

  /**
   * Restore softdeleted user
   * @param ids User ID integer
   * @example DELETE /users/1/restore
   */
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
    return { output: await this.userService.restore(id) };
  }

  /**
   * Disable users
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk/disable?ids=1,2,3
   */
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
    return { output: await this.userService.disableMany(ids) };
  }

  /**
   * Disable user
   * @param ids User ID integer
   * @example DELETE /users/1/disable
   */
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
    return { output: await this.userService.disable(id) };
  }

  /**
   * Enable users
   * @param ids User ID integers ?ids=1,2,3
   * @example DELETE /users/bulk/enable?ids=1,2,3
   */
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
    return { output: await this.userService.enableMany(ids) };
  }

  /**
   * Enable one user
   * @param ids User ID integer
   * @example DELETE /users/1/enable
   */
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
    return { output: await this.userService.enable(id) };
  }
}
