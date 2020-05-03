import { DeleteDateColumn, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntityMetadata, EntityBase, EmptyEntity, EntityBaseWithDate } from '../../../common/abstracts';
import { User } from '.';

@Entity('user_metadata')
export class UserMetadata extends EntityBase(EntityBaseWithDate(BaseEntityMetadata(EmptyEntity))) {
  @Index()
  @ManyToOne((type) => User, (user) => user.metadata, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
