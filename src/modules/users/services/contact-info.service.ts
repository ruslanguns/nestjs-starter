import { Injectable, NotFoundException, BadRequestException, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContactInfo, User, ContactAddress, ContactPhone, UserMetadata } from '../entities';
import {
  ContactInfoDto,
  CreateContactAddressDto,
  CreateContactPhoneDto,
  UpdateContactAddressDto,
  UpdateContactPhoneDto,
  UpdateUserMetadataDto,
} from '../dto';
import { UsersService } from './users.service';
import { CreateUserMetadataDto } from '../dto/create-user-metadata.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(ContactAddress)
    private readonly contactAddressRepository: Repository<ContactAddress>,
    @InjectRepository(UserMetadata)
    private readonly userMetadataRepository: Repository<UserMetadata>,
    @InjectRepository(ContactPhone)
    private readonly contactPhoneRepository: Repository<ContactPhone>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
  ) {}

  async getInfo(userId: number): Promise<ContactInfo> {
    const user = await this.userRepository.findOne(userId);
    return user?.contactInfo ?? null;
  }

  async addInfo(userId: number, dto: ContactInfoDto) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    if (!user.contactInfo) {
      const contactInfo = this.contactInfoRepository.create({ ...dto, user });
      return await this.contactInfoRepository.save(contactInfo);
    }
    throw new BadRequestException('User has already information assigned you should make an update request over the existing data');
  }

  async updateInfo(userId: number, dto: ContactInfoDto) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    let contactInfo: ContactInfo;
    if (!user.contactInfo) {
      contactInfo = this.contactInfoRepository.create({ ...dto, user });
    } else {
      const beforeEdit = await this.contactInfoRepository.findOne(user.contactInfo.id);
      contactInfo = Object.assign(beforeEdit, dto);
    }
    const result = await this.contactInfoRepository.save(contactInfo);
    delete result.id;
    delete result.user;
    return result;
  }

  async getAddresses(userId: number): Promise<ContactAddress[]> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    return user?.contactInfo?.addresses ?? [];
  }

  async getPhones(userId: number): Promise<ContactPhone[]> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    return user?.contactInfo?.phones ?? [];
  }

  async getUserMetadata(userId: number): Promise<UserMetadata[]> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    return user?.metadata ?? [];
  }

  async createAddress(userId: number, dto: CreateContactAddressDto): Promise<ContactAddress> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    if (!user.contactInfo) {
      throw new BadGatewayException('This user does not have contact information, please add information first.');
    }
    const contactAddress = this.contactAddressRepository.create({ ...dto, contactInfo: user.contactInfo });
    const result = await this.contactAddressRepository.save(contactAddress);
    delete result.contactInfo;
    delete result.id;
    return result;
  }

  async createPhone(userId: number, dto: CreateContactPhoneDto): Promise<ContactPhone> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    if (!user.contactInfo) {
      throw new BadGatewayException('This user does not have contact information, please add information first.');
    }
    const contactPhone = this.contactPhoneRepository.create({ ...dto, contactInfo: user.contactInfo });
    const result = await this.contactPhoneRepository.save(contactPhone);
    delete result.contactInfo;
    delete result.id;
    return result;
  }

  async createUserMetadataPhone(userId: number, dto: CreateUserMetadataDto): Promise<UserMetadata> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User with ID provided does not exist.');
    }
    const metadata = this.userMetadataRepository.create(dto);
    return await this.userMetadataRepository.save(metadata);
  }

  async getAddressById(addressId: number) {
    return await this.contactAddressRepository.findOne(addressId);
  }

  async getPhoneById(phoneId: number) {
    return await this.contactPhoneRepository.findOne(phoneId);
  }

  async getUserMetadataById(metadataId: number) {
    return await this.userMetadataRepository.findOne(metadataId);
  }

  async updateAddress(addressId: number, dto: UpdateContactAddressDto) {
    const address = await this.contactAddressRepository.findOne(addressId);
    if (!address) {
      throw new NotFoundException('Address with ID provided does not exist.');
    }
    const addressEdited = Object.assign(address, dto);
    return await this.contactAddressRepository.save(addressEdited);
  }

  async updatePhone(phoneId: number, dto: UpdateContactPhoneDto) {
    const phone = await this.contactPhoneRepository.findOne(phoneId);
    if (!phone) {
      throw new NotFoundException('Phone with ID provided does not exist.');
    }
    const phoneEdited = Object.assign(phone, dto);
    return await this.contactPhoneRepository.save(phoneEdited);
  }

  async updateUserMetadata(metadataId: number, dto: UpdateUserMetadataDto) {
    const metadata = await this.userMetadataRepository.findOne(metadataId);
    if (!metadata) {
      throw new NotFoundException('Metadata with ID provided does not exist.');
    }
    const metadataEdited = Object.assign(metadata, dto);
    return await this.userMetadataRepository.save(metadataEdited);
  }

  async deleteAddress(addressId: number) {
    return await this.contactAddressRepository.delete(addressId);
  }

  async deletePhone(phoneId: number) {
    return await this.contactPhoneRepository.delete(phoneId);
  }

  async deleteUserMetadata(metadataId: number) {
    return await this.userMetadataRepository.delete(metadataId);
  }
}
