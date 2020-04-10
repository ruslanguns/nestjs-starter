import { Entity, Column, Index } from 'typeorm';

import { EntityBase, EmptyEntity, EntityBaseWithDate } from '../../../common/abstracts/entities';

@Entity('term')
export class TermEntity extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @Index()
  @Column({ nullable: false, length: 200 })
  name!: string;

  @Index({ unique: true })
  @Column({ length: 200, nullable: false })
  slug!: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  group!: number;
}
