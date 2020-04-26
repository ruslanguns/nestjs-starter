import { Column, Entity, DeleteDateColumn, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcryptjs';

import { EntityBaseWithDate, EntityBase, EmptyEntity } from '../../../common/abstracts';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User extends EntityBaseWithDate(EntityBase(EmptyEntity)) {
  @ApiProperty()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 254, nullable: false })
  email: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 500, nullable: true, select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @ApiProperty()
  @Column({ type: 'bool', default: true, select: false })
  enabled: boolean;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
