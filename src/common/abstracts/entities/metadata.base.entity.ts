import { PrimaryColumn, Column, Index } from 'typeorm';
import { Constructor } from './base.entity';

export function BaseEntityMetadata<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @Index()
    @Column({ type: 'varchar', length: 255, nullable: false })
    key!: string;

    @Column({ type: 'text', nullable: true })
    value?: string;
  }

  return AbstractBase;
}
