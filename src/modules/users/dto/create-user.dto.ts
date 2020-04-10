import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { IsUsernameAlreadyExist, IsEmailAlreadyExist } from "src/common/validators";

export class CreateUserDto {

  @IsEmailAlreadyExist({
    message: "Email $value already exists. Choose another Email."
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsUsernameAlreadyExist({
    message: "Username $value already exists. Choose another username."
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}