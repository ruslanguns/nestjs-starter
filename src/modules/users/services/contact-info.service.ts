import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo, User } from '../entities';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactRepository: Repository<ContactInfo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getInfo(id: number) {
    const { contactInfo } = await this.userRepository.findOne(id);
    return await this.contactRepository.findOne(contactInfo.id);
  }
}
