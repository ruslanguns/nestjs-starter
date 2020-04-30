import { Entity, DeleteDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EntityBaseWithDate, EmptyEntity, EntityBase } from '../../../common/abstracts';
import { ContactInfo } from './contact-info.entity';

@Entity('contact_address')
export class ContactAddress extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @ApiProperty()
  @ManyToOne((type) => ContactInfo, (contactInfo) => contactInfo.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contact_info_id' })
  contactInfoId!: number;

  @ApiProperty()
  @Column({ type: 'text' })
  description?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  line1?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  line2?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  city?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  state?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  zip?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254 })
  country?: string;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
