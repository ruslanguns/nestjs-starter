import { Column, Index } from 'typeorm';
import { Constructor } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

export function BaseEntityMetadata<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @ApiProperty()
    @Index()
    @Column({ type: 'varchar', length: 255, nullable: true })
    key!: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    value?: string;
  }

  return AbstractBase;
}
