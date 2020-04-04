import { OneToOne, DeleteDateColumn, Entity } from 'typeorm';

import { BaseEntityMetadata, EntityBase, EmptyEntity  } from '../../../common/abstracts';
import { User } from './user.entity';

@Entity('user_metadata')
export class UserMetadata extends EntityBase(BaseEntityMetadata(EmptyEntity)) {

    @OneToOne(type => User, user => user.id)
    userId: number;

    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date
}