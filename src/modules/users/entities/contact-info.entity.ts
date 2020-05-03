import { Entity, DeleteDateColumn, Index, OneToOne, Column, JoinColumn, OneToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { EntityBase, EntityBaseWithDate, EmptyEntity } from '../../../common/abstracts';
import { GenderEnum } from '../../../common/enums';
import { User } from './user.entity';
import { ContactAddress } from './contact-address.entity';
import { ContactPhone } from './contact-phone.entity';

@Entity('contact_info')
export class ContactInfo extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @Type(() => User)
  @OneToOne((type) => User, (user) => user.contactInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, length: 70 })
  name?: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'middle_name', length: 100 })
  middleName?: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'last_name', length: 100 })
  lastName?: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @ApiProperty()
  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.UNDEFINED })
  gender?: GenderEnum;

  @OneToMany((type) => ContactAddress, (address) => address.contactInfo, { cascade: true, eager: true })
  @JoinTable()
  addresses: ContactAddress[];

  @OneToMany((type) => ContactPhone, (phone) => phone.contactInfo, { cascade: true, eager: true })
  @JoinTable()
  phones: ContactPhone[];

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
