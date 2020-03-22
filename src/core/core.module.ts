import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

const CORE_MODULES = [DatabaseModule, ConfigModule]

@Module({
    imports: CORE_MODULES,
    exports: CORE_MODULES,
})
export class CoreModule { }
