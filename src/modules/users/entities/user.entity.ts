import { Column, Entity, DeleteDateColumn, Index, BeforeInsert, BeforeUpdate, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

import { EntityBaseWithDate, EntityBase, EmptyEntity } from '../../../common/abstracts';
import { UserMetadata } from './user-metadata.entity';
import { ContactInfo } from './contact-info.entity';

@Entity('user')
export class User extends EntityBaseWithDate(EntityBase(EmptyEntity)) {
  @ApiProperty()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  email!: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 20, nullable: false })
  username: string;

  @ApiProperty()
  @Exclude()
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

  @OneToMany((type) => UserMetadata, (meta) => meta.user, { cascade: true, eager: true })
  @JoinTable()
  metadata: UserMetadata[];

  @OneToOne((type) => ContactInfo, (info) => info.user, { cascade: true, eager: true })
  @JoinTable()
  contactInfo: ContactInfo;

  @ApiProperty()
  @Column({ type: 'bool', default: true, select: false })
  enabled: boolean;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
