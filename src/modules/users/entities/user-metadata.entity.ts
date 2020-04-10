import { OneToOne, DeleteDateColumn, Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntityMetadata, EntityBase, EmptyEntity } from '../../../common/abstracts';
import { User } from './user.entity';

@Entity('user_metadata')
export class UserMetadata extends EntityBase(BaseEntityMetadata(EmptyEntity)) {
  @Index()
  @ManyToOne(
    type => User,
    user => user.id,
    { nullable: false, cascade: ['soft-remove'] },
  )
  userId!: User;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
