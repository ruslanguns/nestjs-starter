import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ContactInfoDto,
  CreateContactAddressDto,
  CreateContactPhoneDto,
  UpdateContactAddressDto,
  UpdateContactPhoneDto,
  CreateUserMetadataDto,
  UpdateUserMetadataDto,
} from './dto';

import { ContactService } from './services/contact-info.service';

@Controller('users')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Contact CRUD
  @ApiTags('User information')
  @Get(':id/info')
  async getInfo(@Param('id') id: number) {
    return await this.contactService.getInfo(id);
  }

  @ApiTags('User information')
  @Put(':id/info')
  async updateInfo(@Param('id') id: number, @Body() dto: ContactInfoDto) {
    return await this.contactService.updateInfo(id, dto);
  }

  // Address CRUD
  @ApiTags('Users Addresses')
  @Post(':id/address')
  async createAddress(@Param('id') id: number, @Body() dto: CreateContactAddressDto) {
    return await this.contactService.createAddress(id, dto);
  }

  @ApiTags('Users Addresses')
  @Get(':id/address')
  async getAddresses(@Param('id') id: number) {
    return await this.contactService.getAddresses(id);
  }

  @ApiTags('Users Addresses')
  @Get('address/:address')
  async getAddress(@Param('address') address: number) {
    return await this.contactService.getAddressById(address);
  }

  @ApiTags('Users Addresses')
  @Put('address/:address')
  async updateAddress(@Param('address') address: number, @Body() dto: UpdateContactAddressDto) {
    return await this.contactService.updateAddress(address, dto);
  }

  @ApiTags('Users Addresses')
  @Delete('address/:address')
  async deleteAddress(@Param('address') address: number) {
    return await this.contactService.deleteAddress(address);
  }

  // Phone CRUD
  @ApiTags('Users Phones')
  @Post(':id/phone')
  async createPhone(@Param('id') id: number, @Body() dto: CreateContactPhoneDto) {
    return await this.contactService.createPhone(id, dto);
  }

  @ApiTags('Users Phones')
  @Get(':id/phone')
  async getPhones(@Param('id') id: number) {
    return await this.contactService.getPhones(id);
  }

  @ApiTags('Users Phones')
  @Get('phone/:phone')
  async getPhone(@Param('phone') phone: number) {
    return await this.contactService.getPhoneById(phone);
  }

  @ApiTags('Users Phones')
  @Put('phone/:phone')
  async updatePhone(@Param('phone') phone: number, @Body() dto: UpdateContactPhoneDto) {
    return await this.contactService.updatePhone(phone, dto);
  }

  @ApiTags('Users Phones')
  @Delete('phone/:phone')
  async deletePhone(@Param('phone') phone: number) {
    return await this.contactService.deletePhone(phone);
  }

  // Metadata CRUD
  @ApiTags('Users metadata')
  @Post(':id/meta')
  async createMetadata(@Param('id') id: number, @Body() dto: CreateUserMetadataDto) {
    return await this.contactService.createUserMetadataPhone(id, dto);
  }

  @ApiTags('Users metadata')
  @Get(':id/meta')
  async getMetadatas(@Param('id') id: number) {
    return await this.contactService.getUserMetadata(id);
  }

  @ApiTags('Users metadata')
  @Get('meta/:meta')
  async getMetadata(@Param('meta') metadata: number) {
    return await this.contactService.getUserMetadataById(metadata);
  }

  @ApiTags('Users metadata')
  @Put('meta/:meta')
  async updateMetadata(@Param('meta') metadata: number, @Body() dto: UpdateUserMetadataDto) {
    return await this.contactService.updateUserMetadata(metadata, dto);
  }

  @ApiTags('Users metadata')
  @Delete('meta/:meta')
  async deleteMetadata(@Param('meta') metadata: number) {
    return await this.contactService.deleteUserMetadata(metadata);
  }
}
