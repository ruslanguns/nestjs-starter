import { Module } from '@nestjs/common';
import { MailerOptions, MailerModule as MailerModulePackage } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { CONFIG_MAILER_CONFIG } from '../../config/config.constants';

@Module({
  imports: [
    MailerModulePackage.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get<MailerOptions>(CONFIG_MAILER_CONFIG),
      inject: [ConfigService],
    }),
  ],
})
export class MailerModule {}
