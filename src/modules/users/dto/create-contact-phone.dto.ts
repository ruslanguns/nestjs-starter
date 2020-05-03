import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ToBoolean } from '../../../common/transformers';

export class CreateContactPhoneDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  @ToBoolean()
  @IsOptional()
  sms: boolean;
}
