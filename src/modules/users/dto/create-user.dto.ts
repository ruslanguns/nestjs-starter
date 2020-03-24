import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
    @MaxLength(25)
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MaxLength(25)
    @IsString()
    password: string;
}