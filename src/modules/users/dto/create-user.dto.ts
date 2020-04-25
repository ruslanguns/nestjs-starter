import { IsString, IsEmail, IsNotEmpty, Matches, MinLength, MaxLength } from 'class-validator';
import { IsUsernameAlreadyExist, IsEmailAlreadyExist } from 'src/common/validators';
import { PATTERN_VALID_USERNAME } from '../../../config/config.constants';

export class CreateUserDto {
  @IsEmailAlreadyExist({
    message: 'Email $value already exists. Choose another Email.',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

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

  @IsString()
  @IsNotEmpty()
  password!: string;
}
