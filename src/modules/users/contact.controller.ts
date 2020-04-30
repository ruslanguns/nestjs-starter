import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ContactInfoService } from './services/contact-info.service';

@Controller('users')
export class ContactController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  // Contact CRUD
  @Get(':id/info')
  async getInfo(@Param('id') id: number) {
    return { output: await this.contactInfoService.getInfo(id) };
  }

  @Post(':id/info')
  async createInfo() {}

  @Put(':id/info')
  async updateInfo() {}

  // Address CRUD
  @Post(':id/address')
  async createAddress() {}

  @Get(':id/address')
  async getAddresses() {}

  @Get(':id/address/:address')
  async getAddress() {}

  @Put(':id/address/:address')
  async updateAddress() {}

  @Delete(':id/address/:address')
  async deleteAddress() {}

  // Phone CRUD
  @Post(':id/phone')
  async createPhone() {}

  @Get(':id/phone')
  async getPhones() {}

  @Get(':id/phone/:phone')
  async getPhone() {}

  @Put(':id/phone/:phone')
  async updatePhone() {}

  @Delete(':id/phone/:phone')
  async deletePhone() {}

  // Metadata CRUD
  @Post(':id/meta')
  async createMetadata() {}

  @Get(':id/meta')
  async getMetadatas() {}

  @Get(':id/meta/:meta')
  async getMetadata() {}

  @Put(':id/meta/:meta')
  async updateMetadata() {}

  @Delete(':id/meta/:meta')
  async deleteMetadata() {}
}
