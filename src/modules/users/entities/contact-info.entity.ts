import { Entity, DeleteDateColumn, Index, OneToOne, Column, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EntityBase, EntityBaseWithDate, EmptyEntity } from '../../../common/abstracts';
import { GenderEnum } from '../../../common/enums';
import { User } from './user.entity';

@Entity('contact_info')
export class ContactInfo extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @ApiProperty()
  @OneToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  userId!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 70, nullable: true })
  name?: string;

  @ApiProperty()
  @Column({ name: 'middle_name', type: 'varchar', length: 100, nullable: true })
  middleName?: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  lastName?: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true, default: null })
  birthday?: Date;

  @ApiProperty()
  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.UNDEFINED, nullable: true })
  gender?: GenderEnum;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
