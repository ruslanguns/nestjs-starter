import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

import { IsEmailAlreadyExist, IsUsernameAlreadyExist } from '../../../common/validators';
import { CreateUserDto } from './create-user.dto';
import { PATTERN_VALID_USERNAME } from '../../../config/config.constants';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['email', 'username', 'metadata'])) {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsEmailAlreadyExist({ message: 'Email $value already exists. Choose another Email.' })
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsUsernameAlreadyExist({ message: 'Username $value already exists. Choose another username.' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PATTERN_VALID_USERNAME, {
    message: `Username $value don't have a valid format`,
  })
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;
}
