import { Module } from '@nestjs/common';
import { EmailOtpService } from './email-otp/email-otp.service';
import { SmsOtpService } from './sms-otp/sms-otp.service';
import { OtpController } from './otp.controller';

@Module({
  providers: [EmailOtpService, SmsOtpService],
  controllers: [OtpController]
})
export class OtpModule { }
