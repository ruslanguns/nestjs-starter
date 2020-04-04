import { PrimaryColumn, Column } from 'typeorm';
import { Constructor } from './base.entity';

export function BaseEntityMetadata<TBase extends Constructor>(Base: TBase) {

    abstract class AbstractBase extends Base {
        @PrimaryColumn({ type: 'varchar', length: 255, nullable: false, })
        key: string;

        @Column({ type: 'text', nullable: true })
        value: string;
    }

    return AbstractBase;
}
