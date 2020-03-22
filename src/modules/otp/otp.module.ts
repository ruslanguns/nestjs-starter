import { Module } from '@nestjs/common';
import { EmailOtpService } from './email-otp/email-otp.service';
import { SmsOtpService } from './sms-otp/sms-otp.service';

@Module({
    providers: [EmailOtpService, SmsOtpService],
})
export class OtpModule { }
