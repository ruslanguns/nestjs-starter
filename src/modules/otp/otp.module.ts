import { Module } from '@nestjs/common';
import { EmailOtpService } from './email-otp/email-otp.service';
import { SmsOtpService } from './sms-otp/sms-otp.service';
import { OtpService } from './otp.service';

@Module({
    providers: [EmailOtpService, SmsOtpService, OtpService],
})
export class OtpModule { }
