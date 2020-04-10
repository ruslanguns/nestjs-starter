import { Entity, Column, OneToOne, Index, ManyToOne, PrimaryColumn } from 'typeorm';

import { EntityBase, EntityBaseWithDate, EmptyEntity } from '../../../common/abstracts/entities';
import { TermEntity } from './term.entity';

@Entity('term_taxonomy')
@Index(['taxonomy', 'term_id'], { unique: true })
export class TermTaxonomyEntity extends EntityBase(EntityBaseWithDate(EmptyEntity)) {
  @Column({ type: 'varchar', length: '32', nullable: false })
  taxonomy!: string;

  @ManyToOne(
    type => TermEntity,
    term => term.id,
    { nullable: false, cascade: true, onDelete: 'CASCADE' },
  )
  term_id!: TermEntity;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToOne(
    type => TermTaxonomyEntity,
    term_taxonomy => term_taxonomy.id,
    { nullable: true, cascade: ['update'], onDelete: 'SET NULL' },
  )
  parent?: TermTaxonomyEntity;

  @Column({ type: 'integer', nullable: true, default: 0 })
  count?: number;
}
