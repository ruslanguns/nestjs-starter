import { Entity, Index, ManyToOne } from 'typeorm';

import { EntityBase, EmptyEntity, BaseEntityMetadata } from '../../../common/abstracts/entities';
import { TermEntity } from './term.entity';

@Entity('term_metadata')
export class TermMetadataEntity extends EntityBase(BaseEntityMetadata(EmptyEntity)) {
  @Index()
  @ManyToOne(
    () => TermEntity,
    term => term.id,
    { nullable: false, cascade: true, onDelete: 'CASCADE' },
  )
  term_id!: TermEntity;
}
