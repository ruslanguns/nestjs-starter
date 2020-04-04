import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TermMetadataEntity, TermEntity, TermTaxonomyEntity } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([TermMetadataEntity, TermEntity, TermTaxonomyEntity])],
})
export class TaxonomyModule {}
