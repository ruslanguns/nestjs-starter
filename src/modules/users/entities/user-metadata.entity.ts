import { DeleteDateColumn, Entity, Index, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';

import { BaseEntityMetadata, EntityBase, EmptyEntity } from '../../../common/abstracts';
import { User } from '.';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_metadata')
export class UserMetadata extends EntityBase(BaseEntityMetadata(EmptyEntity)) {
  @Index()
  @ManyToOne((type) => User, (user) => user.metadata, { onDelete: 'CASCADE' })
  user!: User;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
