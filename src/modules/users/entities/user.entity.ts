import { Column, Entity, DeleteDateColumn, Index } from 'typeorm';

import { EntityBaseWithDate, EntityBase, EmptyEntity } from '../../../common/abstracts';

@Entity('user')
export class User extends EntityBaseWithDate(EntityBase(EmptyEntity)) {

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 254, nullable: false})
    email: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 50, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    password: string;

    @Column({ type: 'bool', default: true })
    enabled: boolean;

    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date
}
