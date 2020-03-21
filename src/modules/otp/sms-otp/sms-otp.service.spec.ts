import { Test, TestingModule } from '@nestjs/testing';
import { SmsOtpService } from './sms-otp.service';

describe('SmsOtpService', () => {
  let service: SmsOtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsOtpService],
    }).compile();

    service = module.get<SmsOtpService>(SmsOtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
