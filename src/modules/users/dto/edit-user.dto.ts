import { MaxLength, IsString, IsEmail } from 'class-validator';

export class EditUserDto {

    @IsString()
    id!: string;

    @MaxLength(25)
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @MaxLength(25)
    @IsString()
    password!: string;
}