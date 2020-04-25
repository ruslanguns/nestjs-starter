import { Column, Entity, DeleteDateColumn, Index, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcryptjs';

import { EntityBaseWithDate, EntityBase, EmptyEntity } from '../../../common/abstracts';

@Entity('user')
export class User extends EntityBaseWithDate(EntityBase(EmptyEntity)) {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 254, nullable: false })
  email: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 500, nullable: false, select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column({ type: 'bool', default: true, select: false })
  enabled: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
