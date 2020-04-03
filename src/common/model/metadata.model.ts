import { PrimaryColumn, Column } from 'typeorm';

export class MetadataModel {
    @PrimaryColumn({ type: 'varchar', length: 255, nullable: false, })
    meta_key: string;

    @Column({ type: 'text', nullable: true })
    meta_value: string;
}