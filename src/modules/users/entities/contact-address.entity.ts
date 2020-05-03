import { Entity, DeleteDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EntityBaseWithDate, EmptyEntity, EntityBase } from '../../../common/abstracts';
import { ContactInfo } from './contact-info.entity';

@Entity('contact_address')
export class ContactAddress extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @ManyToOne((type) => ContactInfo, (contactInfo) => contactInfo.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contact_info_id' })
  contactInfo!: ContactInfo;

  @ApiProperty()
  @Column({ type: 'text', default: '', nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: false })
  line1?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, default: '', nullable: true })
  line2?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: false })
  city?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: false })
  state?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: false })
  zip?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, nullable: false })
  country?: string;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
