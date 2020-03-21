import { Test, TestingModule } from '@nestjs/testing';
import { EmailOtpService } from './email-otp.service';

describe('EmailOtpService', () => {
  let service: EmailOtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailOtpService],
    }).compile();

    service = module.get<EmailOtpService>(EmailOtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
