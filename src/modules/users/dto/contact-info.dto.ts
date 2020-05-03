import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { GenderEnum } from '../../../common/enums';

export class ContactInfoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthday?: Date;

  @ApiProperty()
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;
}
