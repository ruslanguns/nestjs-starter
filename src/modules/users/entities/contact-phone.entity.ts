import { Entity, JoinColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EntityBase, EntityBaseWithDate, EmptyEntity } from 'src/common/abstracts';
import { ContactInfo } from './contact-info.entity';

@Entity()
export class ContactPhone extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @ApiProperty()
  @ManyToOne((type) => ContactInfo, (contactInfo) => contactInfo.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  contactInfoId!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  description?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: false })
  phone!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  sms: boolean;
}
