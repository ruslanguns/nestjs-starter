import { IsString, IsEmail, IsNotEmpty, Matches, MinLength, MaxLength, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUsernameAlreadyExist, IsEmailAlreadyExist } from '../../../common/validators';
import { PATTERN_VALID_USERNAME } from '../../../config/config.constants';
import { Type } from 'class-transformer';

export class UserMetadataDto {
  @ApiProperty({ description: 'Not necessary on create but mandatory in update metadata.' })
  @IsOptional()
  id?: number;

  @ApiProperty({ description: 'En este campo administraremos el nombre del campo personalizado.' })
  @IsString()
  @IsOptional()
  key?: string;

  @ApiProperty({ description: 'En este campo administraremos el valor del campo personalizado.' })
  @IsString()
  @IsOptional()
  value?: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

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

  @ApiProperty({ description: 'Additional user metadata or custom fields', type: UserMetadataDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserMetadataDto)
  @IsOptional()
  metadata: UserMetadataDto[];
}
