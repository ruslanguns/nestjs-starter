import { Entity, JoinColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EntityBase, EntityBaseWithDate, EmptyEntity } from '../../../common/abstracts';
import { ContactInfo } from './contact-info.entity';

@Entity('contact_phone')
export class ContactPhone extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @ManyToOne((type) => ContactInfo, (contactInfo) => contactInfo.phones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contact_info_id' })
  contactInfo!: ContactInfo;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: false })
  phone!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, default: false })
  sms: boolean;
}
