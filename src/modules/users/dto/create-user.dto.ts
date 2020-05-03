import { IsString, IsEmail, IsNotEmpty, Matches, MinLength, MaxLength, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsUsernameAlreadyExist, IsEmailAlreadyExist } from '../../../common/validators';
import { PATTERN_VALID_USERNAME } from '../../../config/config.constants';
import { ContactInfoDto } from './contact-info.dto';
import { CreateUserMetadataDto } from './create-user-metadata.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email for your account, must be unique.',
  })
  @IsEmailAlreadyExist({
    message: 'Email $value already exists. Choose another Email.',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Username for your account, must be unique.',
  })
  @IsUsernameAlreadyExist({
    message: 'Username $value already exists. Choose another username.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PATTERN_VALID_USERNAME, {
    message: `Username $value don't have a valid format`,
  })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Secure password' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ description: 'Additional user metadata or custom fields', type: CreateUserMetadataDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserMetadataDto)
  @IsOptional()
  metadata: CreateUserMetadataDto[];

  @ApiProperty({ description: 'Additional user information', type: ContactInfoDto })
  @ValidateNested({ each: true })
  @Type(() => ContactInfoDto)
  @IsOptional()
  contactInfo: ContactInfoDto;
}
