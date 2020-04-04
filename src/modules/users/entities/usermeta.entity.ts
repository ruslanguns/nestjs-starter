import { OneToOne, DeleteDateColumn } from 'typeorm';

import { BaseEntityMetadata, EntityBase, EmptyEntity  } from '../../../common/abstracts';
import { User } from './user.entity';


export class UserMetadata extends BaseEntityMetadata(EntityBase(EmptyEntity)) {

    @OneToOne(type => User, user => user.id)
    userId: number;

    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date
}